@extends("layouts.default")

@section("content")

<div class="page-breadcrumb">
	<ol class="breadcrumb container">
		<li><a href="app/home">Home</a></li>
		<li class="active">Clientes</li>
	</ol>
</div>
<div class="page-title">
	<div class="container">
		<h3>Clientes</h3>
	</div>
</div>
<div id="main-wrapper" class="container">
	<!-- Row -->
	<div class="row">
		<div class="col-lg-12 col-md-12">
			<div class="panel panel-white">
				<div class="panel-body">
					<div class="row">
						<ul class='btn-grids'>
							<li><a class="btn-custom btn-addon m-b-sm" id="btn-novo">
								<img src='/img/add_cliente.png' /> Criar Novo Cliente
							</a></li>
							<li><a class="btn-custom btn-addon m-b-sm" href="clientes/cadastrar">
								<img src='/img/import.png' />Importar Clientes
							</a></li>
							<li class='btn-grid-right'><a id="btn-pesquisar-grid" class="btn-custom btn-addon m-b-sm">
								<img src='/img/search.png' />Pesquisar
							</a></li>
						</ul>
					</div>
					<table id="grid" class="table table-bordered table-striped"></table>
					<div id="table_footer">
						<div id="table_footer_paginator"></div>
						<div id="table_footer_row_count"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="modal_cliente" class="modal-overlay">
	<div class='display-table'>
		<div class='display-cell'>
			<div class='modal-wrapper'>
				<div class='modal-wrapper-title'>Novo Cliente</div>
				<div class='modal-wrapper-body'>
					<form action="clientes/salvar" method="POST" class='ajax-form'>
						<div class='row'>
							<div class="form-group col-md-3">
								<label for="nome">Código:</label>
								<input type="text" disabled name='id_cliente' id='id_cliente' class="form-control">
							</div>
							<div class="form-group col-md-9">
								<label for="nome">Nome:</label>
								<input type="text" name='nome_cliente' id='nome_cliente' class="form-control">
							</div>
						</div>
						<div class='row'>
							<div class="form-group col-md-6">
								<label for="exampleInputPassword1">Tipo Pessoa</label> 
								<select class="form-control select-autoload" data-table="tipos_pessoas" data-key="id_tipo_pessoa" data-desc="des_tipo_pessoa" data-default="1" id="id_tipo_pessoa"></select>
							</div>
							<div class="form-group col-md-6">
								<label for="documento">CPF/CNPJ</label> 
								<input type="text" name='documento' id='documento' class="form-control">
							</div>
						</div>
						<div class='row'>
							<div class="form-group col-md-12">
								<label for="'email'">Email:</label>
								<input type="text" name='email' id='email' class="form-control">
							</div>
						</div>
					</form>
				</div>
				<div class='modal-wrapper-footer'></div>
			</div>
		</div>
	</div>
</div>
<script src="/js/clientes.js"></script>

@stop