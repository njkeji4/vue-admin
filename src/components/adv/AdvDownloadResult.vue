<template>
	<div class="main-content">

		<el-row class="toolbar searchparam">			
			<el-col  :span=60 class="search-action-wrap" style="margin-bottom:10px;">
				<div>
					
				</div>				
			</el-col>
		</el-row>
		
		<section class="grid-content">
			<el-table resizable border highlight-current-row stripe class="cmcc-cell-nowrap" ref="table" 
				@selection-change="handleSelectionChange"  :data="tableData"
				@sort-change="handleSortChange">
				
				<el-table-column header-align="center" type="selection">
				</el-table-column>	

				<el-table-column  prop="adTitle" label="广告名称" sortable="custom" width="240" align="center">
				</el-table-column>

				<el-table-column  prop="createTime" label="下载日期" sortable="custom" width="200" align="center">
					<template slot-scope="scope">
						{{scope.row.startTime | dateFormat}}
					</template>
				</el-table-column>

                <el-table-column  prop="deviceName" label="设备名" sortable="custom" width="240" align="center">
				</el-table-column>

                <el-table-column  prop="groupName" label="组名" sortable="custom" width="240" align="center">
				</el-table-column>

                <el-table-column  prop="result" label="状态" sortable="custom" width="240" align="center">
                	<template slot-scope="scope">						
						{{scope.row.result == '0'?'成功':'失败'}}					
					</template>
				</el-table-column>
			</el-table>
		</section>		

		<el-col class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 30, 40, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-col>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import { AdminAPI } from '../../api';
	import { openModal } from '../../common/js/modal';
	import Filters from '../../common/js/filters';
	
	export default {
		data() {
			return {
				total: 0,
				page: 1,
				pageSize: 10,
				sort:'startTime',
				order:'desc',
				sels: [],
				tableData: [],
				groups:[],
			}
		},
		computed: {			
		},
		filters: {
			dateFormat: Filters.dateFormat,	
			groupsFormat: (v) => {
			    var g="";
				for(var i in v){
					g += v[i].groupName + " "
				}				
			  	return g;
			}
		},
		methods: {
			handleSizeChange(size) {
				this.pageSize = size;
				this.handleCurrentChange(1);
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getAdvList();
			},
			
			handleSelectionChange: function(sels) {
				this.sels = sels;
			},

			handleSortChange(col){		
				if(col.prop == null)
				{
					return;
				}		
				this.order = (col.order === 'ascending')? 'asc':'desc';
				this.sort = col.prop ;				
				this.getAdvList();
			},

			getAdvList() {
				let param = {};
				param.page = this.page - 1;
				param.size = this.pageSize;
				param.sort= this.sort;
				param.order=this.order;			
				AdminAPI.searchAdvResult(param).then(({data}) => {
					this.total = data.data.totalElements;
					this.tableData = data.data.content;
				}).catch((err) => {
					this.$message.error('Error', err);
				});

			},
		},
		mounted() {
			this.getAdvList();
		}

	}
</script>

<style scoped="scoped">
	.main-content {
		padding-top: 30px;
	}
</style>