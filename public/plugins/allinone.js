var AllInOne = {
  instances: {},
  ajaxs: {},
  windowLoaded: false,
  scrollWidth: 17,
  defaults: {
      numRow: 20,
      height: "auto",
      type: "local",
      requestUrl: null,
      requestMethod: "POST",
      gridBehavior: "local",
      rowsPerPage: false,
      showFirstPage: false,
      showLastPage: false,
      paginatorWrapper: null,
      rowCountWrapper: null,
      width: '100%',
      cells: [],
      scroll: true,
      selectable: false,
      hideFooter: false,
      customPaginator: false,
      search: true,
      cutHeaderTextToFit: true,
      cutLineTextToFit: true,
      fixedFilter: [],
      paginatorLabels: {
    	  "first": "<",
    	  "prev":  "Prev",
    	  "next": "Next",
    	  "last" : ">"
      },
      fncOverwriteFooter: null,
      onClickRow: null,
      onDblClickRow: null,
      onCheckRow: null,
      onUnCheckRow: null,
      onBeforeGridRender: null,
      onAfterGridRender: null,
      onBeforeRowRender: null,
      onAfterRowRender: null,
      onBeforeCellRender: null,
      onAfterCellRender: null,
      onBeforeRequest: null,
      onAfterRequest: null,
      onViewportChanged: null,
      onComplete: null
  },
  tableElements: {
      createHeader: function(opts) {
          return $("<thead />", opts || {});
      },
      createBody: function(opts) {
          return $("<tbody />", opts || {});
      },
      createFooter: function(opts) {
          return $("<tfoot />", opts || {});
      },
      createTR: function(opts) {
          return $("<tr />", opts || {});
      },
      createTD: function(opts) {
          return $("<td />", opts || {});
      },
      createTH: function(opts) {
          return $("<th />", opts || {});
      }
  },
  hasScrollBar: function() {
	
	  var hasScrollBar = {}, e = this.get(0);
      hasScrollBar.vertical = (e.scrollHeight > e.clientHeight) ? true : false;
      hasScrollBar.horizontal = (e.scrollWidth > e.clientWidth) ? true : false;
      return hasScrollBar;
	  
  },
  fixFieldWidths: function(elem, options) {
	  
	  var withoutWidth = [];
	  var calcWidth = 0;
	  var cells = AllInOne.clone(options.original_cells);
	  var correctCells = options.cells;
	  var fullWidth = !isNaN(options.width) ? options.width : $(elem).parent().width();
	  
	  for (var index = 0; index < cells.length; index++) {
  		  if (typeof cells[index].width != "undefined") {
  			if (cells[index].width.toString().indexOf("%") !== -1) {
  				var percentWidth = parseInt(cells[index].width.toString().replace("%", ""));
  				if (isNaN(percentWidth)) {
  					throw new Error("The specification of the width for the column named '" + cells[index].name + "' is invalid. Only widths in pixels(px) or percent(%) are suported.");
  				}
  				percentWidth = parseInt((fullWidth / 100) * percentWidth);
  				calcWidth += percentWidth;
  				cells[index].width = percentWidth;
  			} else {
  				var pxWidth = cells[index].width;
  				if (pxWidth.toString().toLowerCase().indexOf("px") !== -1) {
  					pxWidth = parseFloat(pxWidth.toString().replace("px", ""));
  				}
  				pxWidth = parseInt(pxWidth);
  				if (isNaN(pxWidth)) {
  					throw new Error("The specification of the width for the column named '" + cells[index].name + "' is invalid. Only widths in pixels(px) or percent(%) are suported.");
  				}
  				calcWidth += pxWidth;
  				cells[index].width = pxWidth;
  			}
  			
  		  } else {
  			withoutWidth.push(index);
  		  }
	  }
	  
	  if (calcWidth > fullWidth) {
		  throw new Error("The sum of widths cannot be higher than " + fullWidth + "px, which is the full width of the table.");
	  } else if (calcWidth == fullWidth & withoutWidth.length > 0) {
		  throw new Error("The sum of widhts specified is exactly the full width of the table, but there are still fields with no width specified and there is not space for them.");
	  }
	  
	  if (withoutWidth.length > 0) {
	  
		  var eachColumn = (fullWidth - calcWidth) / withoutWidth.length;
		  var lastColumn = eachColumn;
		  var stringWidth = eachColumn.toString().split(".");
		  
		  if (stringWidth.length > 1 && parseInt(stringWidth[1]) > 0) {
			  eachColumn = parseInt(stringWidth[0]);
			  lastColumn = parseInt(eachColumn + (parseFloat("0." + stringWidth[1]) * withoutWidth.length));
		  } 
		  
		  for (var index = 0; index < withoutWidth.length; index++) {
			  if (index == (withoutWidth.length - 1)) {
				  cells[withoutWidth[index]].width = lastColumn;
			  } else {
				  cells[withoutWidth[index]].width = eachColumn; 
			  }
		  }

	  }
	  
	  return cells;
	  
  },
  clone: function(obj) {
	    var copy;

	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = AllInOne.clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = AllInOne.clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");
	    
  },
  createSearchCell: function(guid, cell) {
	  
	  var $td = AllInOne.tableElements.createTH({"class": "allinone-search-cell"});
	  
	  if (cell.search === false) {
		  return $td;
	  }
	  
	  var code;
	  
	  if (typeof cell.customSearch == "function") {
		  code = cell.customSearch(cell.name);
	  } else if (typeof cell.searchValues != "undefined") {
		  var $search = $("<select>", {name: cell.name});
		  $search.append($("<option>", {value: ''}));
		  for (var i = 0; i < cell.searchValues.length; i++) {
			  $search.append($("<option>", {value: cell.searchValues[i][0], text: cell.searchValues[i][1]}));
		  }
		  code.on("chage", function() {
			 AllInOne.instances[guid].performSearch();
		  });
		  code = $search;
	  } else {
		  
		  code = $("<input>", {
			 type: "text", 
			 name: cell.name
		  });
		  
		  code.on("keyup", function(event) {
			  event.keyCode == 13 && AllInOne.instances[guid].performSearch();
		  });
	  }
	  
	  return $td.html(code);
	  
  },
  create: function(elem, guid, options) {
      
      var $grid = $(elem);
      var $headerRow = AllInOne.tableElements.createTR({"id": "grid-header"});
      var $searchRow = AllInOne.tableElements.createTR({"id": "grid-search"});
      
      var height = !isNaN(options.height) ? options.height + "px" : options.height;
      $grid.attr({"allinone-guid": guid, "width": options.width, "cellpading": "0", "cellspacing": "0", "border": "0"});
      $grid.addClass("allinone-grid");
      
      if (options.cells.length <= 0) {
          console.warn("No grid cell specified. Specify at least one.");
          return;
      }
      
      if (options.selectable) {
    	  options.cells.unshift({
    		  label: "<input type='checkbox' class='allinone-checkbox-checkall' />",
    		  name: "checkbox",
    		  align: "center",
    		  width: "30px",
    		  search: false,
    		  onBeforeRender: function() {
    			  return "<input type='checkbox' class='allinone-checkbox' />";
    		  }
    	  });
      }
      
      options.original_cells = AllInOne.clone(options.cells);
      
      for (var index = 0; index < options.cells.length; index++) {

          var columnHeadOpts = {
              "data-index": options.cells[index].name,
              "class": "allinone-table-header-column",
              "html" : options.cells[index].label,
              "style" : "text-align: " + options.cells[index].align || "left"
          };
          
          if (options.cutHeaderTextToFit) {
        	  columnHeadOpts["class"] += " nowrap";
          }
          
          var $th = AllInOne.tableElements.createTH(columnHeadOpts);
          $headerRow.append($th);
          
          $searchRow.append(AllInOne.createSearchCell(guid, options.cells[index]));
          
      }
      
      if (options.scroll) {
    	  var blankScrollCell = AllInOne.tableElements.createTH({"style": "width:" + AllInOne.scrollWidth + "px"});
    	  $headerRow.append(blankScrollCell);
    	  $searchRow.append(blankScrollCell);
      }
      
      if (!options.search) {
    	  $searchRow.hide();
      }
      
      var $header = AllInOne.tableElements.createHeader().html($headerRow).append($searchRow);
      $grid.html($header);
      $grid.append(AllInOne.tableElements.createBody({"height": height, "class": options.scroll ? '' : "no-scroll"}));
      
      if (options.hideFooter !== true) {
    	  
    	  $footer = AllInOne.tableElements.createFooter({"class":"allinone-table-footer"});
		  var $footerRow = AllInOne.tableElements.createTR({"id": "allinone-footer-row"});
		  var $footerColumn = AllInOne.tableElements.createTD({"colspan": options.cells.length + (options.scroll == true ? 1 : 0)});

		  $footerColumn.append($("<div />", {"class": "col-md-8 allinone-footer-left"}));
		  $footerColumn.append($("<div />", {"class": "col-md-4 allinone-footer-right"}));
		  $footer.html($footerRow.html($footerColumn));
		  $grid.append($footer);
	    
      }
      
      options.cells = AllInOne.adjust(elem, options);
     
      return options;
      
  },
  buildFooter: function(guid) {
	  var grid = AllInOne.instances[guid];
	
	  var paginationHTML = AllInOne.createPaginator(guid);
	  var rowCountHTML = AllInOne.createRowCount(guid);
	  var $paginatorWrapper, $rowCountWrapper;
	  
	  if (grid.options.paginatorWrapper !== null && ($paginatorWrapper = $(grid.options.paginatorWrapper)).size()) {
		  $paginatorWrapper.html(paginationHTML);
	  }
	  
	  if (grid.options.rowCountWrapper !== null && ($rowCountWrapper = $(grid.options.rowCountWrapper)).size()) {
		  $rowCountWrapper.html(rowCountHTML);
	  }

	  if (!grid.options.hideFooter) {
		  if (!$paginatorWrapper) {
			  $(grid.selector).find(".allinone-footer-left").html(paginationHTML);
		  }
	  
		  if (!$rowCountWrapper) {
			  $(grid.selector).find(".allinone-footer-right").html(rowCountHTML);
		  }
	  }
	  
  },
  createRowCount: function(guid) {
	  var totalPageRow, initPage, counter, lengthPage = 1, lengthRows = 1, page  = 1;
	  
	  var grid = AllInOne.instances[guid];
	  
	  if (typeof grid !== "undefined") {
		  lengthPage = grid.options.rowsPerPage;
		  lengthRows = grid.options.gridBehavior == "server" ? grid.data.records : grid.data.rows.length;
		  page = grid.data.page;
	  }
	  
	  page = page || 1;
	  lengthPage = lengthPage || 1;
	  totalPageRow = page * lengthPage;
	  initPage = totalPageRow - lengthPage + 1;
	  totalPageRow = totalPageRow > lengthRows ? lengthRows : totalPageRow;
	  lengthRows = lengthRows || 1;
	  
	  var counter = initPage + ' - ' + totalPageRow + ' of ' + lengthRows + ' rows';
	  
	  if (grid.options.customRowCount && typeof grid.options.customRowCount == "function") {
		  counter = grid.options.customRowCount.call(grid, initPage, totalPageRow, lengthRows);
	  }
	  
	  return '<span class="allinone-footer-row-count">'  + counter + '</span>';
	  
  },
  createPaginatorHTML: function(actualPage, qtdPages, labels, showFirstPage, showLastPage) {
	
	  var initPage = 1; endPage = qtdPages;
	  
	  endPage = qtdPages > 5 ? 5 : qtdPages;
	  
	  if (qtdPages > 5) {
		   if (actualPage > 3) {
			   initPage = actualPage - 2;
			   endPage = actualPage + 2;
			   
			   if (actualPage == qtdPages) {
				   initPage = qtdPages - 4;
				   endPage = qtdPages;
			   } else if (endPage > qtdPages) {
				   initPage -= endPage - qtdPages;
				   endPage = actualPage + (endPage - qtdPages);
			   }

		   }
	  }
		   
	  var htmlPagination = '<ul class="allinone-pagination">';
	  
	  if (labels.first !== false) {
		  htmlPagination += '<li class="first ' + (actualPage == 1 ? "disabled" : "") + '"><a data-page="first" class="button">' + labels.first + '</a></li>';
	  }
	  
	  if (labels.prev !== false) {
		  htmlPagination += '<li class="prev ' + (actualPage == 1 ? "disabled" : "") + '"><a data-page="prev" class="button">' + labels.prev + '</a></li>';
	  }
	  
	  if (showFirstPage === true) {
		  if (actualPage > 3) {
			  htmlPagination += '<li><a data-page="1" class="button">1</a></li>';
		  	  if (actualPage > 4) {
		  		 htmlPagination += '<li class="dots"><a data-page="..." class="button">...</a></li>';
		  	  }
		  }
	  }
	  
	  for (var page = initPage; page <= endPage; page++) {
		  htmlPagination += '<li ' + (page == actualPage ? 'class="active"' : '') + '><a data-page="' + page + '" class="button">' + page + '</a></li>';
	  }
	  
	  if (showLastPage === true) {
		  if (actualPage < (qtdPages - 2)) {
		  	 if (actualPage < (qtdPages - 3)) {
				  htmlPagination += '<li class="dots"><a data-page="..." class="button">...</a></li>';
			  }
			  
			  htmlPagination += '<li><a data-page="' + qtdPages + '" class="button">' + qtdPages + '</a></li>';
		  }
	  }

	  if (labels.next !== false) {
		  htmlPagination += '<li class="next"><a data-page="next" class="button">' + labels.next + '</a></li>';
	  }
	  
	  if (labels.last !== false) {
		  htmlPagination +=	'<li class="last ' + (actualPage == qtdPages ? "disabled" : "") + '"><a data-page="last" class="button">' + labels.last + '</a></li>';
	  }
	  
	  htmlPagination += '</ul>';
	  
	  return htmlPagination;
	  
  },
  createPaginator: function(guid) {

	  var grid = AllInOne.instances[guid];
	  var qtdPages = 1, actualPage = 1, showFirstPage = AllInOne.defaults.showFirstPage, showLastPage = AllInOne.defaults.showLastPage, labels = AllInOne.defaults.paginatorLabels, totalRows;
	  
	  if (typeof grid !== "undefined") {
		  
		  totalRows = grid.options.gridBehavior == "server" ? grid.data.records : grid.data.rows.length;

		  qtdPages = Math.ceil(totalRows / parseInt(grid.options.rowsPerPage));
		  actualPage = parseInt(grid.data.page);
		  showFirstPage = grid.options.showFirstPage;
		  showLastPage = grid.options.showLastPage;
		  labels = grid.options.paginatorLabels;
		  
	  }
	  
	  if (grid.options.customPaginator && typeof grid.options.customPaginatorFunc == "function") {
		  return grid.options.customPaginatorFunc.call(grid, actualPage, qtdPages, labels, showFirstPage, showLastPage);
	  }
	  
	  return AllInOne.createPaginatorHTML(actualPage, qtdPages, labels, showFirstPage, showLastPage);
	  
	  
  },
  adjust: function(elem, options) {
	  
	  var $grid = $(elem);
	  var gridWidth = 0;
	  
	  var cells = AllInOne.fixFieldWidths(elem, options);
	  
	  for (var idx = 0; idx < cells.length; idx++) {
		  var nameCSSWidth = idx == (cells.length-1) ? "width" : "min-width"; 
		  $grid.find("thead").eq(0).find("tr").each(function() {
			  $(this).find("th").eq(idx).css(nameCSSWidth, cells[idx].width + "px");
			  $(this).find("th").eq(idx).css("max-width", cells[idx].width + "px");  
		  });
		  $grid.find("tbody").eq(0).find("tr").each(function() {
			  $(this).find("td").eq(idx).css({nameCSSWidth: cells[idx].width + "px", "max-width": cells[idx].width + "px"});
		  });
		  gridWidth += cells[idx].width;
	  }
	  
	  if (options.width && !isNaN(options.width)) {
		  gridWidth = options.width;
	  }
	  
	  $grid.css({"min-width": gridWidth, "width": gridWidth});
	  
	  if (options.hideFooter !== true) {
		  $grid.find("tfoot tr:first td:first").css("width", gridWidth + "px");
	  }
	  
	  return cells; 	 
	  
  },
  calcHeightPerRows: function(guid) {
	  var grid = AllInOne.instances[guid];
	  var rowsPerPage = grid.options.rowsPerPage;
	  var lineHeight = $(grid.selector).find("tbody tr:eq(1)").outerHeight();
	  
	  grid.setHeight(rowsPerPage * lineHeight);
	  
  },
  request: function(guid) {
	  var grid = AllInOne.instances[guid], sendData = {};
	  
      if (grid.options.requestUrl === null) {
    	  throw new Error("The request URL is not specified.");
      }
      
      if (typeof AllInOne.ajaxs[guid] != "undefined" && AllInOne.ajaxs[guid] !== null) {
    	  AllInOne.ajaxs[guid].cancel();
      }
      
      if (grid.options.gridBehavior == "server") {
    	  sendData = {
			  page: grid.data.page,
			  filters: grid.data.filters,
			  rowsPerPage: grid.options.rowsPerPage
    	  };
      }
      
      if (typeof grid.options.onBeforeRequest == "function") {
    	  grid.options.onBeforeRequest.call(grid);
      }
      
      AllInOne.ajaxs[guid] = $.ajax({
    	  url: grid.options.requestUrl,
    	  dataType: 'json',
    	  data: sendData,
    	  type: grid.options.requestMethod,
    	  success: function(callback) {
    		  grid.data.page = grid.options.gridBehavior == "server" ? (callback.page || 1) : 1;
    		  grid.data.guidIndex = grid.options.gridBehavior == "server" ? ((grid.data.page * grid.options.rowsPerPage) - grid.options.rowsPerPage) : 0;
              grid.clearRows();
    		  
    		  var rows = callback.rows || [];
    		  
    		  for (var index = 0; index < rows.length; index++) {
                  grid.addRow(rows[index]);
              }
              
    		  grid.setRecords(callback.records);
    		  AllInOne.ajaxs[guid] = null;
    		  grid.reload();
    		  
    	      if (typeof grid.options.onAfterRequest == "function") {
    	    	  grid.options.onAfterRequest.call(grid);
    	      }
    	  }
      });
  },
  generateNamespace: function() {
      var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      var uniqid = randLetter + Date.now();
      return uniqid;
  },
  grid: function(opts) {	  
	  try {
		  
		  var self = this;
	      var options = $.extend({}, AllInOne.defaults, opts);
	      var guid = AllInOne.generateNamespace();
	      options = AllInOne.create(this, guid, options);
	      AllInOne.instances[guid] = new AllInOne.functionalities(this, options);
	      AllInOne.buildFooter(guid);
	      AllInOne.instances[guid].init();
	      AllInOne.checkWidth(self, guid, options);
		  
	  } catch (exception) {
		  AllInOne.handleException(this, exception);
	  }
	  
  },
  checkWidth: function(self, guid, options) {
	
	  if (options.width.toString().indexOf("%") !== -1) {
	      
	      var interval = setInterval(function() {
	    	  if (AllInOne.windowLoaded) {
	    		  var width = $(self).parent().width();
	    		  var settedWidth = parseInt(options.width.toString().replace("%", ""));
	    		  var finalWidth = (width / 100) * settedWidth;
	    		  
	    		  
	    		  AllInOne.instances[guid].setWidth(finalWidth);
	    		  
	    		  if (typeof options.onComplete == "function") {
	    			  options.onComplete.call(AllInOne.instances[guid], options);
	    		  }
	    		  
	    		  clearInterval(interval);
	    	  }
	      }, 10);
	      
      }
	  
  },
  events: function(guid) {	
	  
	  var grid = AllInOne.instances[guid];
	  var $paginatorWrapper = $(grid.options.paginatorWrapper || grid.selector);
	
	  $paginatorWrapper.find(".allinone-pagination li:not(.dots) a").on("click", function() {
		  if ($(this).hasClass("active") || $(this).hasClass("disabled")) {
			  return;
		  }
		  grid.setPage($(this).attr("data-page"));
	  });
	  
  },
  getGridInstance: function() {
      var namespace = $(this).attr("allinone-guid");
      if (typeof AllInOne.instances[namespace] != undefined) {
          return AllInOne.instances[namespace];
      } else {
          console.warn("AllInOneGrid not found.")
          return {};
      }
  },
  handleException: function(elem, exception) {
	  $(elem).remove();
	  var msg = "Grid with ID: " + $(elem).attr("id") + ".";
	  msg += "\n\r";
	  msg += exception.message;
	  alert(msg);
  },
  functionalities: function(elem, configuration) {
      return {
    	  guid: null,
          selector: elem,
          options: configuration,
          data: {
              rows: [],
              inPageRows: [],
              rowsUpdated: [],
              guidIndex: 0,
              filteredRows: {},
              filters: [],
              orders: [],
              page: 1,
              records: 1,
              rowsInPage: 0
          },
          init: function() {
        	  AllInOne.events(this.getGuid());
        	  
        	  if (this.options.type == 'ajax') {
        		  AllInOne.request(this.getGuid());
        	  }
          },
          getGuid: function() {
        	  if (this.guid == null) {
        		  this.guid = $(this.selector).attr("allinone-guid");
        	  }
        	  return this.guid;
          },
          isBehaviorServer: function() {
        	  return this.options.gridBehavior == "server";
          },
          getFilters: function() {},
          addFilter: function() {},
          setFilters: function() {},
          clearFilters: function() {},
          getOrderColumns: function() {},
          setOrderColumns: function() {},
          addOrderColumn: function() {},
          clearOrderColumn: function() {},
          toggleSearch: function() {
        	  if ($(this.selector).find("tr#grid-search").is(":visible")) {
        		  this.hideSearch();
        	  } else {
        		  this.showSearch();
        	  }
          },
          showSearch: function() {
        	  $(this.selector).find("tr#grid-search").show();
          },
          hideSearch: function() {
        	  $(this.selector).find("tr#grid-search").hide();
          },
          performSearch: function() {
        	  this.data.filters = this.getSearchFilters(true);
        	  if (this.isBehaviorServer()) {
        		  this.reloadRequest();
        	  } else {
        		  this.localSearch();
        	  }
          },
          getSearchFilters: function(serialize) {
        	  
        	  if (!serialize) {
        		  return this.data.filters;
        	  }
        	  
        	  var $cells  = $(this.selector).find("tr#grid-search").find("th");
        	  var filters = {};
        	  
        	  $cells.each(function() {
        		  var $htmlField = $(this).find("input, select").eq(0);
        		  if ($htmlField.size()) {
        			  filters[$htmlField.attr("name") || $htmlField.attr("id")] = $htmlField.val();
        		  }
        	  });
        	  
        	  return filters;
        	  
          },
          setRecords: function(records) {
        	  this.data.records = records || 0;
          },
          getPage: function() {
        	  return this.data.page;
          },
          setPage: function(page) {
        	  
        	  var totalRows = this.isBehaviorServer() ? this.data.records : this.data.rows.length;
        	  var maxPage = Math.ceil(totalRows / this.options.rowsPerPage);
        	  this.data.page = parseInt(this.data.page);
        	  
        	  switch (page) {
        	  	case "first":
        	  		page = 1;
        	  		break;
        	  	case "last":
        	  		page = maxPage;
        	  		break;
        	  	case "next":
        	  		page = (this.data.page + 1) <= maxPage ? (this.data.page + 1) : maxPage;
        	  		break;
        	  	case "prev":
        	  		page = this.data.page == 1 ? 1 : this.data.page - 1;
        	  		break;        	  	  
        	  }
        	  
        	  if (page == this.data.page || (page == 1 && this.data.page == 1)) {
        		  return;
        	  }
        	  
    		  if (isNaN(page)) {
    			  console.warn("Page must be a number or a pre-defined command (first, last, next and prev)");
    		  }
    		  
           	  if (this.isBehaviorServer()) {
        		  this.data.page = page;
        		  this.data.inPageRows = [];
        		  this.reloadRequest();
        		  return;
        	  }
    		  
    		  var startIndex = ((page - 1) * this.options.rowsPerPage);
    		  var endIndex = startIndex + this.options.rowsPerPage - 1;
    		  
    		  this.clearRows(true);
    		  
    		  for (var indexPage = startIndex; indexPage <= endIndex; indexPage++) {
    			  if (typeof this.data.rows[indexPage] != "undefined") {
    				  this.addRow(this.data.rows[indexPage], true);
    			  }
    		  }
    		  
    		  this.data.page = page;
    		  this.reload();
    		  
          },
          setWidth: function(value) {
        	  try {
        		  this.options.width = value;
        		  this.options.cells = AllInOne.adjust(this.selector, this.options);
        	  } catch (exception) {
        		  AllInOne.handleException(elem, exception);
        	  }
          },
          setHeight: function(height) {
        	  $(this.selector).find("tbody").eq(0).height(height);
          },
          reload: function() {
		      AllInOne.buildFooter(this.getGuid());
		      AllInOne.events(this.getGuid());
          },
          reloadRequest: function() {
        	  AllInOne.request(this.getGuid());
          },
          clearGrid: function() {
        	  $(this.selector).find("tbody").eq(0).html('');
        	  this.data.rowsInPage = [];
        	  this.data.rows = [];  
        	  this.data.rowsUpdated = [];  
        	  this.data.guidIndex = 0;
          },
          clearRows: function(onlyCleanPageRows) {
        	  $(this.selector).find("tbody").eq(0).html('');
        	  this.data.rowsInPage = [];
        	  if (onlyCleanPageRows !== true) {
        		  this.data.rows = [];  
        	  }
          },
          setRows: function(rows) {
              this.clearGrid();
              for (var index = 0; index < rows.length; index++) {
                 var row = this.addRow(rows[index]);
              }
          },
          addRowInMemory: function(row) {
        	  for (var idx = 0; idx < this.options.cells.length; idx++) {
        		  if (typeof row[this.options.cells[idx].name] == "undefined") {
        			  row[this.options.cells[idx].name] = "";
        		  }
        	  }
        	  this.data.rows.push(row);
          },
          addRow: function(row, addOnlyInPage) {
        	  if (typeof row != "object") {
        		  row = {};
        	  }
        	  
        	  if (!this.isBehaviorServer()) {
        		  row.guidIndex = typeof row.guidIndex != "undefined" ? row.guidIndex : this.data.guidIndex++;
        	  } else {
        		  row.guidIndex = this.data.guidIndex++;
        	  }
        		  
        	  if (!this.canAddRow()) {
        		  this.addRowInMemory(row);
        		  return;
        	  } 
        	  
              var $tbody = $(this.selector).find("tbody").eq(0);
              var $tr = AllInOne.tableElements.createTR({'guid': row.guidIndex});
              var gridGuid = this.getGuid();
              var gridInstance = AllInOne.instances[gridGuid];
              
              for (var idx = 0; idx < this.options.cells.length; idx++) {
            	  
            	  var sizeWidth = this.options.cells[idx].width;
            	  
            	  if (idx == (this.options.cells.length-1)) {
            		  sizeWidth += AllInOne.scrollWidth;
            		  var cssWidth = "width:";
            	  } else {
            		  var cssWidth = "min-width:";
            	  }
            	  
            	  var align = this.options.cells[idx].align || "left";
            	  
                  var properties = {"style": cssWidth + sizeWidth + "px; max-width: " + sizeWidth + "px; text-align:" + align + ";", "guid" : idx};
                  
                  if (this.options.cutLineTextToFit) {
                	  properties["class"] = "nowrap";
                  }
                  
            	  var $td = AllInOne.tableElements.createTD(properties);
            	  
            	  var valueColumn = row[this.options.cells[idx].name];
            	  
            	  if (typeof this.options.cells[idx].onBeforeRender == "function") {
            		  valueColumn = this.options.cells[idx].onBeforeRender.call(gridInstance, row, valueColumn);
                  }
            	  
                  if (typeof valueColumn != "undefined") {
                	  $td.html(valueColumn);
                  } else {
                	  $td.html('&nbsp;');
                	  row[this.options.cells[idx].name] = "";
                  }
                  
                  if (typeof this.options.cells[idx].onClickColumn == "function") {
                	  $td.on("click", function() {
                		  var columnGuid = $(this).attr("guid")
                		  var rowGuid = $(this).parent().attr("guid");
                		  gridInstance.options.cells[columnGuid].onClickColumn.call(gridInstance, columnGuid, rowGuid, gridInstance.data.rows[rowGuid], $(this).text());
                	  });
                  }
                  
                  $tr.append($td);
              }
              
              if (addOnlyInPage !== true) {
            	  this.data.rows[row.guidIndex] = row;
              }
              
              this.data.inPageRows.push(row);
              this.data.rowsInPage++;
              
              if (typeof this.options.onClickRow == "function") {
            	  $tr.on("click", function() {
            		  var trGuid = $(this).attr("guid");
            		  gridInstance.options.onClickRow.call(gridInstance, trGuid, gridInstance.data.rows[trGuid]);
            	  });
              }
              
              if (typeof this.options.onDblClickRow == "function") {
            	  $tr.on("dblclick", function() {
            		  var trGuid = $(this).attr("guid");
            		  gridInstance.options.onDblClickRow.call(gridInstance, trGuid, gridInstance.data.rows[trGuid]);
            	  });
              }
              
              $tbody.append($tr);
          },
          getRows: function() {
        	  return this.data.rows;
          },
          getInPageRows: function() {
        	  return this.data.inPageRows;
          },
          getInPageRowsLength: function() {
        	  return this.data.inPageRows.length;
          },
          updateRow: function(guid, data) {
        	  
        	  var $tr = $(this.selector).find("tbody > tr[guid=" + guid + "]").eq(0);
        	  var $tds = $tr.find("td");
        	  
        	  if ($tr.size() == 0) {
        		  console.warn("Row with the id " + guid + " not found.");
        		  return;
        	  }
        	  
              for (var idx = 0; idx < this.options.cells.length; idx++) {
                  if (typeof data[this.options.cells[idx].name] != "undefined" && data[this.options.cells[idx].name] != "") {
                	  $tds.eq(idx).text(data[this.options.cells[idx].name]);
                  } else {
                	  $tds.eq(idx).html('&nbsp;');
                	  data[this.options.cells[idx].name] = "";
                  }
              }
              
              this.data.rowsUpdated[guid] = data;
        	  this.data.rows[guid] = data
        	  
          },
          deleteRow: function(guid) {
        	  var $tr = $(this.selector).find("tbody > tr[guid=" + guid + "]").eq(0);
        	  
        	  if ($tr.size() == 0) {
        		  console.warn("Row with the id " + guid + " not found.");
        		  return;
        	  }

    	  	  $tr.remove();
        	  this.data.rows.splice(guid, 1);
          },
          canAddRow: function() {
        	  return this.options.rowsPerPage === false || isNaN(this.options.rowsPerPage) ? true : this.data.rowsInPage < this.options.rowsPerPage;
          },
          updateRowCell: function() {}
      }
  }
};

$(window).load(function() {
	AllInOne.windowLoaded = true;
});

$.fn.grid = AllInOne.grid;
$.fn.getGridInstance = AllInOne.getGridInstance;