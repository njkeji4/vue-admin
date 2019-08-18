<template>
	<div class="main-content" style="padding:3px;">
		<el-table :data="tableData"
				resizable border highlight-current-row stripe v-loading="listLoading" ref="table" 
				 class="cmcc-cell-nowrap"
		>
			<el-table-column prop="date" label="日期" width="140">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="0" :page-sizes="[10, 20, 30, 40, 50, 100]" 
			:page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="20">
		</el-pagination>
		
	</div>
</template>

<script>
	import axios from 'axios';
	import Vue from 'vue'
	import { mapGetters, mapActions } from 'vuex';
	import util from '../../common/js/util';
	import { AdminAPI } from '../../api';
	import { openModal } from '../../common/js/modal';

	import DeviceEditDlg from './DeviceEditDlg';
	//import DeviceGroupAddDlg from './BindDeviceDlg';
	const openDeviceEditDlg = openModal(DeviceEditDlg);
	//const openDeviceGroupAddDlg = openModal(DeviceGroupAddDlg);

	export default {
		data() {
			const item = {
				date: '2016-05-02',
				name: 'abc',
				address: 'xxxxxxxxxxxx'
			};
			return {
				tableData: Array(100).fill(item),				
				
			}
		},
		
		methods: {		

		
		},
		created() {
			
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
	.el-table th,
	.el-table__fixed-header-wrapper thead div,
	,
	.el-table__header-wrapper thead div {
		background-color: #177fd8;
		color: #fff;
	}
	
	.el-table .sort-caret.ascending {
		border-bottom: 5px solid #fff;
	}
	
	.el-table .sort-caret.descending {
		border-top: 5px solid #fff;
		border-top-color: #fff !important;
	}
	
	.searchparam {
		.el-button {
			border-radius: 6px;
		}
		@media only screen and (min-width: 1470px) {
			.paramleft {
				width: 75%;
			}
			
		}
		@media only screen and (max-width: 1470px) {
			.paramleft {
				width: 83%;
			}
			.search-action-wrap {
				width: 100%;
			}
		}
	}
	
	.add-device-form {
		.el-input,
		.el-select {
			width: 200px;
		}
		.el-dialog {
			width: 480px;
		}
		.el-form-item__tips {
			font-size: 12px;
			line-height: 1;
			padding-top: 4px;
			position: absolute;
			left: auto;
			right: 0;
			top: 10px;
		}
	}
	
	.device-params-picker {
		.el-input {
			width: 350px;
		}
		.el-dialog {
			width: 650px;
		}
		.el-form-item__error {
			top: 8px;
			left: 360px;
		}
	}
	
	.el-table {
		.el-button {
			background-color: #fff;
			color: #333;
		}
	}
</style>