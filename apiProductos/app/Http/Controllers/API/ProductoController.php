<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests\ProductoRequest;
use App\Http\Resources\ProductoResource;
use App\Http\Resources\CategoriaResource;
use App\Http\Controllers\AppBaseController;

class ProductoController extends AppBaseController
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        #Obtiene los productos de la caché
        $productos = Cache::remember('productos', 600, function () {
            return [];
        });
        return $this->sendResponse(new ProductoResource($productos));
    }

    /**
     * @param ProductoRequest $request
     * @return mixed
     */
    public function store(ProductoRequest $request)
    {
        #Valida los datos antes de procesarlos
        $data = $request->validated();
        
        #Se guarda el id de una categoria
        $id = $data['categoria_id'];
        
        #se envia a una funcion que encuentra la categoria si existe, si no retorna null
        $categoria = $this->obtenerCategoria($id);

        //Crea un arreglo de producto
        $producto = [
            'id'           => Str::uuid(),
            'estado'       => true,
            'precio'       => $data['precio'],
            'descripcion'  => $data['descripcion'],
            'categoria_id' => new CategoriaResource($categoria),
        ];

        //Obtiene los productos de caché y le asigna un nuevo elemento
        $productos = Cache::remember('productos', 600, function () use ($producto) {
            return [];
        });

        $productos[] = $producto;

        #Actualiza el valor en caché
        Cache::put('productos', $productos, 600);

        return $this->sendSuccess('Registro agregado correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        #Obtiene todos los productos de la caché
        $productos = $this->obtenerProductos();

        #Obtiene un producto con la id enviada
        $producto = $this->obtenerProducto($productos, $id);

        #Valida que exista el producto
        if (!$producto) {
            return $this->sendError('Producto no encontrado', 404);
        }

        return $this->sendResponse($producto);
    }

    /**
     * @param ProductoRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(ProductoRequest $request, string $id): JsonResponse
    {
        #Obtiene todos los productos de la caché
        $productos = $this->obtenerProductos();

        #Obtiene un producto con la id enviada
        $producto = $this->obtenerProducto($productos, $id);

        #Valida que exista el producto
        if (!$producto) {
            return $this->sendError('Producto no encontrado', 404);
        }

        #Valida que el producto este activo
        if ($producto['estado'] == false) {
            return $this->sendError('El producto debe estar activo para poder editarse');
        }

        #Valida los datos antes de procesarlos
        $data = $request->validated();

        #Se guarda el id de una categoria
        $id = $data['categoria_id'];

        #se envia a una funcion que encuentra la categoria si existe, si no retorna null
        $categoria = $this->obtenerCategoria($id);

        #Crea un arreglo del producto con los datos actualizados
        $producto['precio']       = $data['precio'];
        $producto['descripcion']  = $data['descripcion'];
        $producto['categoria_id'] = $categoria;

        #Obtiene un arreglo con el cambio
        $productos = $this->actualizarProducto($producto);


        #Actualiza el valor en cache
        Cache::put('productos', $productos, 600);

        return $this->sendSuccess('Se ha dado de alta correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        #Obtiene todos los productos de la caché
        $productos = $this->obtenerProductos();

        #Obtiene un producto con la id enviada
        $producto = $this->obtenerProducto($productos, $id);

        #Valida que exista el producto
        if (!$producto) {
            return $this->sendError('Producto no encontrado', 404);
        }
        #Cambia el estado del producto
        $producto['estado'] = !$producto['estado'];

        #Obtiene un arreglo con el cambio
        $productos = $this->actualizarProducto($producto);

        Cache::put('productos', $productos, 600);

        return $this->sendSuccess('Estado del producto actualizado');
    }

    /**
     * @param $productos
     * @param $id
     * @return null
     */
    public function obtenerProducto($productos, $id) {

        #Obtiene un producto desde su id
        $producto = collect($productos)->firstWhere('id', $id);

        return $producto;
    }

    /**
     * @return mixed
     */
    public function obtenerProductos(): mixed
    {
        #Obtiene todos los productos desde la caché
        $productos = Cache::get('productos', []);

        return $productos;
    }

    /**
     * @param $id
     * @return null
     */
    public function obtenerCategoria($id) {
        #Obtener todas las categorías desde el caché
        $categorias = Cache::get('categorias', []);  

        $categoriaExist = null;
        foreach ($categorias as $categoria) {
            if ($categoria['id'] == $id) {
                $categoriaExist = $categoria;
                break;
            }
        }
        return $categoriaExist;
    }

    public function actualizarProducto($producto) {
        #Obtiene todos los productos de la caché
        $productos = $this->obtenerProductos();

        #Actualiza el arreglo de productos
        $productos = collect($productos)->map(function ($item) use ($producto) {
            if ($item['id'] == $producto['id']) {
                return $producto;
            }
            return $item;
        })->all();

        return $productos;
    }
}
