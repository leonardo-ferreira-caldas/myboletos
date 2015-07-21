<?php

namespace MyBoletos\Exceptions;

use Exception;
use MyBoletos\Exceptions\RuleException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
    	
    	if ($e instanceof RuleException) {
    		return response()->json([
				'message' => $e->getMessage(),
				'code'    => $e->getCode(),
    			'file'    => $e->getFile(),
    			'line'    => $e->getLine(),
    			'trace'   => $e->getTraceAsString()
     		], 400);
    	}
    	
        return parent::render($request, $e);
    }
}