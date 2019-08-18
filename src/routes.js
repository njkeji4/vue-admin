import Main from './components/Main.vue';
import Chart from './components/charts/Chart.vue';
import Login from './components/Login.vue';
import DeviceList from './components/device/DeviceList.vue';
import DataList from './components/datamgt/DataList.vue';
import BlackList from './components/blacklist/BlackList.vue';
import Settings from './components/settings/SystemSettings.vue';
import MainStat from './components/statistic/Stat.vue';
import Alarm from './components/alarm/AlarmList.vue';
import Usermgt from './components/user/UserManagement.vue';
import versionmgt from './components/version/VersionManagement.vue';
import groupMgt from './components/group/GroupManagement.vue';
import advMgt from './components/adv/AdvManagement.vue';
import advDownload from './components/adv/AdvDownloadResult.vue';


const PlaceHolderRouteView = {
    template: '<router-view></router-view>'
};

let routes = [  
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true        
    }, 
    {
        path: '/',
        component: Main,
        name: '',
        children:[
            {
                path: 'chart',
                component: Chart,
                name:'',
                title:'Chart',
                iconCls: 'el-icon-pie-chart',
                
            },
            {
                path:'mgt',
                component: PlaceHolderRouteView,
                name:'',
                title:'Setting',
                iconCls:'el-icon-setting',
                children:[
                    {
                        path: 'device',
                        component: DeviceList,
                        name:'',
                        title:'device ',
                        iconCls: 'el-icon-star-off'
                    },
                    {
                        path: 'datamgt',
                        component: DataList,
                        name:'',
                        title:'data',
                        iconCls: 'el-icon-s-goods'
                    },           
                    {
                        path: 'alarm',
                        component: Alarm,
                        name:'',
                        title:'alarm',
                        iconCls: 'el-icon-warning',                
                    },
                ]
            },
          
            {
                path: 'blacklist',
                component: DeviceList,
                name:'',
                title:'black list',
                iconCls: 'el-icon-notebook-2',
                
            },
            
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/chart'
        }
    }
   
];
    

export default routes;