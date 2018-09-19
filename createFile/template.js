	var title="&&pageTitle&&";
	var config={
		url_page:_dir+"&&pageName&&.html",
		title_page:title+"管理",
		title_list:title+"列表",
		code_list:"&&msgid&&",
		pagination_01:$("#page_01")
	};

	$(document).ready(function(){
		if(_page=="&&pageName&&"){
			setTitle_01(config['title_list'],config['title_page'],config['url_add']);

            //默认时间
            setDefaultDate($("#fstartDate"),$("#fendDate"));

            var zNodes=getTreeList(5,1,function(result){
                if(result){
                    let _tree1 = $.extend(true, [], result);
                    new setZtree("tree_01",_tree1,1).initZtree();
                }
            });
			//加载事件
			var _trs,_pageSize,_pageCount;
			var setData=function(pIndex,pSize){
				pIndex=pIndex || 0;
				pSize=pSize || 20;

				var pageSetBody={"pageNo":pIndex,"pageSize":pSize};
				var sendObj=&&ConditionList&&;
				_call(config['code_list'],sendObj,function(res){
					_trs="";
					if(!res.msgBody || res.msgBody.pageOutBody.pageObjBody.length == 0){
						_trs="";
						_pageSize=1;
						_pageCount=1;
					}
					else{
						_pageSize=res.msgBody.pageOutBody.pageSize;
						_pageCount=res.msgBody.pageOutBody.count;
						$.each(res.msgBody.pageOutBody.pageObjBody,function(i,v){
							_trs=_trs+&&listKeyName&&;
						});
					}
					$("#table_01 tbody").html(_trs);
                    exportExcel(sendObj,config['code_list']);
                    //分页方法
                    setPagination(config['pagination_01'],_pageSize,_pageCount,setData);
				});
			};

			var loadingAll=function(){
				//初始化加载数据
				setData();
			}
			loadingAll();
			
			//查询方法
			setSearch(config['pagination_01'],loadingAll);
		}
		$(".select2").select2();
	});