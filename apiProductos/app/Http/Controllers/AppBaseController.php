<?php

namespace App\Http\Controllers;

use Response;

class AppBaseController extends Controller
{
    /**
     * @param $result
     * @param $message
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function sendResponse($result, $message = NULL)
    {
        return Response::json($result); //Solo se envía el objeto, y no el data con el message
    }

    /**
     * @param $result
     * @param $count
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function sendResponseList($result, $count)
    {
        return Response::json([
            'items' => $result,
            'count' => $count
        ]);
    }

    /**
     * @param $error
     * @param int $code
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function sendError($error, int $code = 400)
    {
        return Response::json($error, $code);
    }

    /**
     * @param $message
     * @param int $status
     * @return \Illuminate\Http\JsonResponse|Response
     */
    public function sendSuccess($message, int $status = 200, $data = null)
    {
        return Response::json([
            'success' => true,
            'message' => $message,
            'data'    => $data
        ], $status);
    }

}
