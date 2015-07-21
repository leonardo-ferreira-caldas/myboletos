$(document).ready(function() {
	
	var $form = $(".ajax-form");
	var $mainGrid = $("#grid");
	
	if ($mainGrid.size()) {
	
		$mainGrid.grid({
			type: "ajax",
			requestUrl: 'contas-bancarias/listar',
			gridBehavior: "server",
			scroll: false,
			rowsPerPage: 10,
			width: '100%',
			search: false,
			height: 349,
			hideFooter: true,
			paginatorWrapper: '#table_footer_paginator',
			rowCountWrapper: '#table_footer_row_count',
			onComplete: function() {
				var grid = this;
				$("#btn-pesquisar-grid").click(function() {
					grid.toggleSearch();
				});
			},
			customRowCount: function(startPageRow, endPageRow, totalRows) {
				return startPageRow + ' - ' + endPageRow + ' de ' + totalRows + ' registros';
			},
			onAfterRequest: function() {
				Utils.grid.loadGridIconEvents(this);
			},
			cells: [
		        {label: "Código", name: "id_conta_bancaria", align: "left", width: "10%"},
		        {label: "Banco", name: "des_banco", align: "left"},
		        {label: "Carteira", name: "des_carteira_banco", align: "left"},
		        {label: "", name: "opcoes", align: "center", width: "70px", search: false, onBeforeRender: function(row, valueColumn) {
		        	return "<img src='application/assets/img/edit.png' data-key='id_cliente' data-url='clientes/editar' data-key-value='" + row["id_cliente"] + "' class='grid-icon grid-icon-edit'/>" + 
		        		   "<img src='application/assets/img/delete.png' data-key='id_cliente' data-url='clientes/deletar' data-key-value='" + row["id_cliente"] + "' class='grid-icon grid-icon-delete'/>";
		        }}
	        ]
		});
	
	}
	
	if ($form.size()) {
		$form.onRequest(function(callback) {
			Utils.alert.info("Registro salvo com sucesso!", function() {
				if ($("#id_cliente").isEmpty()) {
					Utils.form.sendFormPost('contas-bancarias/editar', {id_cliente: callback.id_cliente});
				}
			});
		});
		$form.loadFormObject();
		
		$("#deletar_cliente").on("click", function(e) {
			e.preventDefault();
			Utils.form.deletar('contas-bancarias/deletar', {'id_conta_contaria': $("#id_conta_contaria").val()}, function(callback) {
				Utils.url.redirect('contas-bancarias/');
			});
		});
	}
	
});