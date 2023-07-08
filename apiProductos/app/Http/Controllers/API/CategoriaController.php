<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests\CategoriaRequest;
use App\Http\Resources\CategoriaResource;
use App\Http\Controllers\AppBaseController;

class CategoriaController extends AppBaseController
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        #Obtiene las categorías de la caché
        $categorias = Cache::remember('categorias', 600, function () {
            return [];
        });
        return $this->sendResponse(new CategoriaResource($categorias));
    }

    /**
     * @param CategoriaRequest $request
     * @return JsonResponse
     */
    public function store(CategoriaRequest $request): JsonResponse
    {
        #Valida los datos antes de procesarlos
        $data = $request->validated();

        #Crea un arreglo de categorías
        $categoria = [
            'id'          => Str::uuid(),
            'estado'      => true,
            'descripcion' => $data['descripcion'],
        ];

        //Obtiene las categorías de caché y le asigna un nuevo elemento
        $categorias = Cache::remember('categorias', 600, function () use ($categoria) {
            return [];
        });

        $categorias[] = $categoria;

        #Actualiza el valor en caché
        Cache::put('categorias', $categorias, 600);

        return $this->sendSuccess('Registro agregado correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        #Obtiene todos los categorías de la caché
        $categorias = $this->obtenerCategorias();
        
        #Obtiene una categoría con la id enviada
        $categoria = $this->obtenerCategoria($categorias, $id);
        
        #Valida que exista la categoría
        if (!$categoria) {
            return $this->sendError('Categoría no encontrada', 404);
        }

        return $this->sendResponse($categoria);
    }

    /**
     * @param CategoriaRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(CategoriaRequest $request, string $id): JsonResponse
    {
        #Obtiene todos las categorías de la caché
        $categorias = $this->obtenerCategorias();

        #Obtiene una categoría con la id enviada
        $categoria = $this->obtenerCategoria($categorias, $id);
                
        #Valida que exista la categoría
        if (!$categoria) {
            return $this->sendError('Categoría no encontrada', 404);
        }
        #Valida que la categoría este activa
        if (!$categoria['estado']) {
            return $this->sendError('La categoría debe estar activa para poder editarse');
        }

        #Valida los datos antes de procesarlos
        $data = $request->validated();

        #Crea un arreglo del producto con los datos actualizados
        $categoria['descripcion'] = $data['descripcion'];

        #Obtiene un arreglo con el cambio
        $categorias = $this->actualizarCategoria($categoria);

        #Actualiza el valor en cache
        Cache::put('categorias', $categorias, 600);

        return $this->sendSuccess('Se ha dado de alta correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        #Obtiene todos las categorías de la caché
        $categorias = $this->obtenerCategorias();

        #Obtiene una categoría con la id enviada
        $categoria = $this->obtenerCategoria($categorias, $id);
                
        #Valida que exista la categoría
        if (!$categoria) {
            return $this->sendError('Categoría no encontrada', 404);
        }
        #Cambia el estado de la categoría
        $categoria['estado'] = !$categoria['estado'];

        #Obtiene un arreglo con el cambio
        $categorias = $this->actualizarCategoria($categoria);

        #Actualiza el valor en cache
        Cache::put('categorias', $categorias, 600);

        return $this->sendSuccess('Estado de la categoría actualizada');
    }

    /**
     * @param $categorias
     * @param $id
     * @return null $categoria
     */
    public function obtenerCategoria($categorias, $id) {
        #Obtiene un categoría desde su id
        $categoria = collect($categorias)->firstWhere('id', $id);
        
        return $categoria;
    }
    
    /**
     * @return mixed
     */
    public function obtenerCategorias(): mixed
    {
        
        #Obtiene todas las categoríaS de la caché
        $categorias = Cache::get('categorias', []);

        return $categorias;
    }

    public function actualizarCategoria($categoria) {
        #Obtiene todas las categoríaS de la caché
        $categorias = $this->obtenerCategorias();

        #Actualiza el arreglo de categorías
        $categorias = collect($categorias)->map(function ($item) use ($categoria) {
            if ($item['id'] == $categoria['id']) {
                return $categoria;
            }
            return $item;
        })->all();

        return $categorias;
    }
}
