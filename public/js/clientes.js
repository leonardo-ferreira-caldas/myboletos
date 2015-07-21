$(document).ready(function() {
    
    $grid = $("#grid");
    Utils.form.loadSelects();
    ClienteController.init();
    
    $grid.grid({
        type: "ajax",
        requestUrl: '/clientes/listar',
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
        onDblClickRow: function(rowid, rowObj) {
            ClienteController.editar(rowObj["id_cliente"]);
        },
        customRowCount: function(startPageRow, endPageRow, totalRows) {
            return startPageRow + ' - ' + endPageRow + ' de ' + totalRows + ' registros';
        },
        cells: [
            {label: "Código",       name: "id_cliente",      align: "left", width: "10%"},
            {label: "Nome Cliente", name: "nome_cliente",    align: "left"},
            {label: "Pessoa",       name: "des_tipo_pessoa", align: "left"},
            {label: "CPF/CNPJ",     name: "documento",       align: "left", onBeforeRender: function(row, valueColumn) {
                if (valueColumn.toString().length == 11) {
                    return Utils.helper.formatarCPF(valueColumn.toString());
                } else if (valueColumn.toString().length == 14) {
                    return Utils.helper.formatarCNPJ(valueColumn.toString());
                } else {
                    return valueColumn;
                }
             }},
             {label: "",            name: "opcoes",          align: "center", width: "70px", search: false, onBeforeRender: function(row, valueColumn) {
                return "<img src='application/assets/img/edit.png' data-value='" + row["id_cliente"] + "' class='grid-icon grid-icon-edit'/>" + "<img src='application/assets/img/delete.png' data-value='" + row["id_cliente"] + "' class='grid-icon grid-icon-delete'/>";
             }}
         ]
    });
    
    $("#btn-novo").on("click", ClienteController.adicionar);
    
    $grid.delegate(".grid-icon-edit", "click", function() {
        ClienteController.editar($(this).data("value"));
    });
    
    $grid.delegate(".grid-icon-delete", "click", ClienteController.deletar);
    
});

var ClienteController = {
    TIPO_PESSOA_FISICA: 1,
    TIPO_PESSOA_JURIDICA: 2,
    init: function() {
        $("#modal_cliente").find("#id_tipo_pessoa").on("change", function() {
            if ($(this).val() == ClienteController.TIPO_PESSOA_FISICA) {
                $("#modal_cliente").find("#documento").mask("999.999.999-99");
            } else {
                $("#modal_cliente").find("#documento").mask("99.999.999/9999-99");
            }
        });
    },
    adicionar: function() {
        Utils.modal.form("#modal_cliente", function() {
            var $form = $("#modal_cliente").find("form");
            var data = $form.serializeJSON();
            Utils.ajax.action("ClientesBO/salvar", data, function(response) {
                Utils.alert.info("Registro salvo com sucesso!", function() {
                    $("#grid").getGridInstance().reloadRequest();
                });
            });
            $("#modal_cliente").modal('hide');
        }, function() {
            var $modal = $("#modal_cliente");
            $modal.clearForm();
            $modal.find("#documento").mask("999.999.999-99");
        });
    },
    editar: function(idCliente) {
        Utils.ajax.action("ClientesBO/consultar", {
            id_cliente: idCliente
        }, function(callback) {
            Utils.modal.form("#modal_cliente", function() {
                var $form = $("#modal_cliente").find("form");
                var data = $form.serializeJSON();
                Utils.ajax.action("clientes/salvar", data, function(response) {
                    Utils.alert.info("Registro salvo com sucesso!", function() {
                        $("#grid").getGridInstance().reloadRequest();
                    });
                });
                $("#modal_cliente").modal('hide');
            }, function() {
                var $modal = $("#modal_cliente");
                $modal.clearForm();
                $modal.deserializeJSON(callback);
                if ($modal.find("#id_tipo_pessoa").val() == ClienteController.TIPO_PESSOA_FISICA) {
                    $("#modal_cliente").find("#documento").mask("999.999.999-99");
                } else {
                    $("#modal_cliente").find("#documento").mask("99.999.999/9999-99");
                }
            });
        });
    },
    deletar: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var idCliente = $(this).data("value");
        Utils.alert.confirm("Deseja realmente deletar este registro?", function() {
            Utils.ajax.action('clientes/deletar', {
                id_cliente: idCliente
            }, function(response) {
                Utils.alert.info("Registro deletado com sucesso.", function() {
                    $("#grid").getGridInstance().reloadRequest();
                });
            });
        });
    }
};