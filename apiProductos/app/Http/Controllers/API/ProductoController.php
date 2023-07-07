<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests\ProductoRequest;
use App\Http\Controllers\AppBaseController;

class ProductoController extends AppBaseController
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $productos = Cache::remember('productos', 60, function () {
            return [];
        });
        return $this->sendResponse($productos);
    }

    /**
     * @param ProductoRequest $request
     * @return mixed
     */
    public function store(ProductoRequest $request)
    {
        $data = $request->validated();

        $producto = [
            'id'           => Str::uuid(),
            'estado'       => true,
            'precio'       => $data['precio'],
            'descripcion'  => $data['descripcion'],
            'categoria_id' => $data['categoria_id'],
        ];

        $productos = Cache::remember('productos', 60, function () use ($producto) {
            return [];
        });

        $productos[] = $producto;

        Cache::put('productos', $productos, 60);

        return $this->sendSuccess('Registro agregado correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $productos = $this->obtenerProductos();

        $producto = $this->obtenerProducto($productos, $id);

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
        $productos = $this->obtenerProductos();

        $producto = Arr::first($productos, function ($producto) use ($id) {
            return $producto['id'] == $id;
        });

        if (!$producto) {
            return $this->sendError('Producto no encontrado', 404);
        }

        if ($producto['estado'] == false) {
            return $this->sendError('El producto debe estar activo para poder editarse');
        }

        $data = $request->validated();

        $producto['precio']       = $data['precio'];
        $producto['descripcion']  = $data['descripcion'];
        $producto['categoria_id'] = $data['categoria_id'];

        $productos = array_map(function ($item) use ($producto) {
            if ($item['id'] == $producto['id']) {
                return $producto;
            }
            return $item;
        }, $productos);

        Cache::put('productos', $productos, 60);

        return $this->sendSuccess('Se ha dado de alta correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $productos = $this->obtenerProductos();

        $producto = $this->obtenerProducto($productos, $id);

        if (!$producto) {
            return $this->sendError('Producto no encontrado', 404);
        }

        $producto['estado'] = !$producto['estado'];

        $productos = collect($productos)->map(function ($item) use ($producto) {
            if ($item['id'] == $producto['id']) {
                return $producto;
            }
            return $item;
        })->all();

        Cache::put('productos', $productos, 60);

        return $this->sendSuccess('Estado del producto actualizado');
    }

    /**
     * @param $productos
     * @param $id
     * @return null
     */
    public function obtenerProducto($productos, $id) {

        $producto = collect($productos)->firstWhere('id', $id);

        return $producto;
    }

    /**
     * @return mixed
     */
    public function obtenerProductos(): mixed
    {

        $productos = Cache::get('productos', []);

        return $productos;
    }
}
