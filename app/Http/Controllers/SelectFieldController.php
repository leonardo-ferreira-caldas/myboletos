<?php

namespace MyBoletos\Http\Controllers;

use Illuminate\Http\Request;
use MyBoletos\Exceptions\RuleException;
use MyBoletos\Http\Requests;
use MyBoletos\Http\Controllers\Controller;

class SelectFieldController extends Controller
{
	
	// nome tabela => nome modelo
	private $allowedTables = [
		"tipos_pessoas" => "MyBoletos\Models\TipoPessoa"
	];
	
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function listar(Request $request) {

        $tableNames = array_keys($this->allowedTables);
        
        $tables = array_unique($request->input("tables", []));
        
        if (count($tables) == 0) {
        	throw new RuleException("Nenhuma tabela foi informada para consulta.");
        }
        
        $response = array();
    	
    	foreach ($tables as $table) {
    		if (!in_array($table, $tableNames)) {
    			throw new RuleException(sf("Acesso a tabela '%s' não permitido.", $table));
    		}
    		
    		$facade = $this->allowedTables[$table];
    		$response[$table] = $facade::all()->toArray();
    	}
    	
    	return response()->json($response);
    	
    }

}