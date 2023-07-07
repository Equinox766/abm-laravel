<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'descripcion',
        'precio',
        'estado',
        'categoria_id',
    ];
}
