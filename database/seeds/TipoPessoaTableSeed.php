<?php

use Illuminate\Database\Seeder;
use MyBoletos\Models\TipoPessoa;

class TipoPessoaTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       TipoPessoa::create(['des_tipo_pessoa' => 'Pessoa Física']);
       TipoPessoa::create(['des_tipo_pessoa' => 'Pessoa Jurídica']);
    }
}
