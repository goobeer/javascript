(function ($) {
    $.extend({
        fixTableHeader: function (option) {
            var defaultConfig = { containerSelector: '.fixTable', tabHeaderCss: { 'background-color': 'rgba(200,200,200,1)' } };
            if (option == undefined) {
                option = defaultConfig
            }
            else {
                if (typeof option.containerSelector != 'string') {
                    option.containerSelector = defaultConfig.containerSelector;
                }
                if (typeof option.tabHeaderCss != 'object') {
                    option.tabHeaderCss = defaultConfig.tabHeaderCss;
                }
            }

            var headerContainer = $(option.containerSelector + ' table thead');
            var headerItems = headerContainer.children();//tr
			var lastContainer = $(option.containerSelector + ' table tbody tr:last');
			
			if(headerItems.length>1){//多表头
				var rows=[];
				headerItems.each(function(i,e){
					var i=rows.length;
					var row=$(e).children('th').map(function(ci,ce){
						var cell=$(ce);
						var y=cell.attr('rowspan'),x=cell.attr('colspan');
						y=y?parseInt(y):1;
						x=x?parseInt(x):1;
						return {cell:cell,y:y,x:x,id:i+'_'+ci};
					});
					rows.push(row);
				});

				//填充
				for(var i=0;i<rows.length;i++){
					for(var j=0;j<rows[i].length;j++){
						var cell=rows[i][j];
						var x=cell.x;
						cell.x=1;
						while(x>1){
							rows[i].splice(j,0,cell);
							x--;
						}
						var y=cell.y;
						cell.y=1;
						while(y>1 && (i+y-1)<rows.length){
							rows[i+y-1].splice(j,0,cell);
							y--;
						}
					}
				}
				
				//去重
				if(rows.length>0){
					var lastRow=rows[rows.length-1];
					var ths=[];
					for(var i=0;i<lastRow.length;i++){
						var cell=lastRow[i];
						var contained=false;
						for(var j=0;j<ths.length;j++){
							var th=ths[j];
							if(th.id==cell.id){
								contained=true;
								continue;
							}
						}
						if(!contained){
							ths.push(cell);
						}
					}
					headerItems = $(ths.map(function(e,i){
						return e.cell;
					}));
				}
			}else{//单表头
				headerItems=headerItems.children();
			}

			headerContainer.css(option.tabHeaderCss);
			headerContainer.css({ 'position': 'fixed','top':'-1px' });

			var tds = lastContainer.children();
			tds.each(function (i, e) {
				$(headerItems.get(i)).css({ 'width': $(e).css('width') });
			});

            $(option.containerSelector + ' table tr:nth(1)').children('td').css({ 'padding-top': headerContainer.css('height') });

            $(document).scroll(function (e) {
                var distance = $(option.containerSelector).height() - e.target.scrollingElement.scrollTop - headerContainer.height() - lastContainer.height();
                if (distance <= 0) {
                    headerContainer.css({ 'position': 'static' });
                }
                else {
                    if (headerContainer.css('position') != 'fixed') {
                        headerContainer.css({ 'position': 'fixed' });
                    }
                }
            });
        }
    });
}(jQuery))