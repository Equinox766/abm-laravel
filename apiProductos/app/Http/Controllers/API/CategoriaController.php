<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests\CategoriaRequest;
use App\Http\Controllers\AppBaseController;

class CategoriaController extends AppBaseController
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categorias = Cache::remember('categorias', 60, function () {
            return [];
        });
        return $this->sendResponse($categorias);
    }

    /**
     * @param CategoriaRequest $request
     * @return JsonResponse
     */
    public function store(CategoriaRequest $request): JsonResponse
    {
        $data = $request->validated();

        $categoria = [
            'id'          => Str::uuid(),
            'estado'      => true,
            'descripcion' => $data['descripcion'],
        ];

        $categorias = Cache::remember('categorias', 60, function () use ($categoria) {
            return [];
        });

        $categorias[] = $categoria;

        Cache::put('categorias', $categorias, 60);

        return $this->sendSuccess('Registro agregado correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $categorias = $this->obtenerCategorias();

        $categoria = $this->obtenerCategoria($categorias, $id);

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
        $categorias = $this->obtenerCategorias();

        $categoria = Arr::first($categorias, function ($categoria) use ($id) {
            return $categoria['id'] == $id;
        });

        if (!$categoria) {
            return $this->sendError('Categoría no encontrada', 404);
        }

        if (!$categoria['estado']) {
            return $this->sendError('La categoría debe estar activa para poder editarse');
        }

        $data = $request->validated();

        $categoria['descripcion']  = $data['descripcion'];

        $categorias = array_map(function ($item) use ($categoria) {
            if ($item['id'] == $categoria['id']) {
                return $categoria;
            }
            return $item;
        }, $categorias);

        Cache::put('categorias', $categorias, 60);

        return $this->sendSuccess('Se ha dado de alta correctamente');
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $categorias = $this->obtenerCategorias();

        $categoria = $this->obtenerCategoria($categorias, $id);

        if (!$categoria) {
            return $this->sendError('Categoría no encontrada', 404);
        }

        $categoria['estado'] = !$categoria['estado'];

        $categorias = collect($categorias)->map(function ($item) use ($categoria) {
            if ($item['id'] == $categoria['id']) {
                return $categoria;
            }
            return $item;
        })->all();

        Cache::put('categorias', $categorias, 60);

        return $this->sendSuccess('Estado de la categoría actualizada');
    }

    /**
     * @param $categorias
     * @param $id
     * @return null $categoria
     */
    public function obtenerCategoria($categorias, $id) {

        $categoria = collect($categorias)->firstWhere('id', $id);

        return $categoria;
    }

    /**
     * @return mixed
     */
    public function obtenerCategorias(): mixed
    {

        $categorias = Cache::get('categorias', []);

        return $categorias;
    }
}
