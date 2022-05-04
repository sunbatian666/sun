<template>
  <div>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-card class="box-card">
        <div>
          <el-row :gutter="20">
            <el-col :span="3">
              <el-input placeholder="姓名" v-model="queryinfo.query" @clear="getUserList" clearable></el-input>
            </el-col>
            <el-col :span="3">
              <el-input placeholder="顾客手机号" clearable></el-input>
            </el-col>

            <el-col :span="3">
              <el-input placeholder="顾客卡号" clearable></el-input>
            </el-col>
            <el-col :span="3">
              <el-select v-model="value" placeholder="顾客类型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-input placeholder="请输入顾问姓名" clearable></el-input>
            </el-col>
            <el-col :span="3">
              <el-input placeholder="请选择日期" prefix-icon="el-icon-date">
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-select v-model="value" placeholder="选择卡等级">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>

        <!--第二行按钮-->
        <div>
          <el-row :gutter="20">
            <el-col :span="3">
              <el-select v-model="value" placeholder="注册门店">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select v-model="value" placeholder="卡籍门店">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-button class="select" @click="getUserList">查询</el-button>
            <el-button class="select">查询手机号</el-button>
            <el-button class="addbutton select"  @click="diglog=true">新增</el-button>
            <el-button class="addbutton select"  @click="diglog1=true">添加用户</el-button>
           



          </el-row>

          <el-dialog
  title="添加用户"
  :visible.sync="diglog1"
  width="40%"
  
 >


<el-form ref="form" :model="formrule" label-width="80px" :rules="formrules">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="userform.name" ></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="userform.password"></el-input>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="userform.email"></el-input>
  </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input v-model="userform.mobile"></el-input>
  </el-form-item>
</el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="diglog1 = false">取 消</el-button>
    <el-button type="primary" @click="diglog1 = false">确 定</el-button>
  </span>
</el-dialog>

          <el-table
            :data="userlist"
            border
            style="width: 100%"
            :header-cell-style="{
              background: '#E7ECF0',
              borderColor: '#D2D5DC',
            }"
            :cell-style="{ borderColor: '#D2D5DC' }"
            :row-style="{ borderColor: '#D2D5DC' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="180"></el-table-column>

            <el-table-column prop="username" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="180">
            </el-table-column>
            <el-table-column prop="role_name" label="角色" width="180">
            </el-table-column>

            <el-table-column label="状态" width="180">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.mg_state"
                  active-color="#66BEC5"
                  inactive-color="#263238"
                  @change="userstatechange(scope.row)" >
                </el-switch >
                </template>     
            </el-table-column>

            <el-table-column prop="" label="操作" min-width="220">
              <el-tooltip
                class="item"
                effect="dark"
                content="修改信息"
                placement="top"
                :enterable="false">

                <el-button class="editbutton" icon="el-icon-edit"></el-button>    
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="删除角色"
                placement="top"
                :enterable="false"
              >
                <el-button type="danger" icon="el-icon-delete"></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button type="warning" icon="el-icon-setting"></el-button>
              </el-tooltip>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(queryinfo.pagenum)"
          :page-sizes="[1, 2, 10, 20]"
          :page-size="Number(queryinfo.pagesize)"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(this.total)"
        >
        </el-pagination>
      </el-card>
                

                <table >
            <el-dialog
  title="提示"
  :visible.sync="diglog"
  width="80%"
  :before-close="handleClose" :show-close="false"  @close="close2">


 
   
     <el-form  label-width="100px" class="demo-form-inline"   :rules="formrules" :model="form"  ref="yanzheng" >
       <tr>
         <td>    
  <el-form-item label="顾客姓名" prop="username" >
    <el-input class="buttonclass1" v-model="form.username"></el-input>
  </el-form-item>
  </td>

<td>
 <el-table-column>
  <el-form-item label="手机号" prop="mobile">
    <el-input class="buttonclass1" v-model="form.mobile"></el-input>
  </el-form-item>
   </el-table-column>
</td>
<td>
  <el-form-item label="生日" prop="form.datatime">
     <el-date-picker
      v-model="form.datatime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
</td>
</tr>

<tr>
  <td>
  <el-form-item label="性别" prop="form.sex" >
   <el-radio-group v-model="form.sex">
      <el-radio :label="1">女</el-radio>
    <el-radio :label="2">男</el-radio>
  </el-radio-group>
  </el-form-item>
  </td>
  <td>

  <el-form-item label="职业" prop="form.job">
     <el-select v-model="form.job" placeholder="请选择" popper-class="selectclass">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value" >
    </el-option>
  </el-select>
  </el-form-item>
  </td>

<td>
  <el-form-item label="收入范围" prop="form.salary">
     <el-select v-model="form.salary" placeholder="请选择" popper-class="selectclass">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value" >
    </el-option>
  </el-select>
  </el-form-item>
</td>
</tr>
       <tr>
         <td>    
  <el-form-item label="身份证号" prop="form.idcard" >
    <el-input class="buttonclass1" v-model="form.idcard"></el-input>
  </el-form-item>
  </td>

<td>
 <el-table-column>
  <el-form-item label="顾客来源" prop="customer">
      <el-select v-model="form.customer" placeholder="请选择" popper-class="selectclass">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value" >
    </el-option>
  </el-select>
  </el-form-item>
   </el-table-column>
</td>
<td>
  <el-form-item label="婚姻" prop="form.marriage">
      <el-radio-group v-model="form.marriage">
    <el-radio :label="1">未知</el-radio>
    <el-radio :label="2">已婚</el-radio>
    <el-radio :label="3">未婚</el-radio>
  </el-radio-group>
  </el-form-item>
</td>
</tr>
       <tr>
         <td>    
  <el-form-item label="地址" prop="form.address" >
   <el-cascader :options="options4" show-all-levels="false" clearable></el-cascader>
  </el-form-item>
  </td>

<td>
 <el-table-column>
  <el-form-item label="详细地址" prop="form.address">
    <el-input class="buttonclass2" v-model="form.address"  length="300"></el-input>
  </el-form-item>
   </el-table-column>
</td>

</tr>
  </el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="close2()">取 消</el-button>
    <el-button class="confirmclass" @click="diglog = false">确 定</el-button>
  </span>

</el-dialog>
 </table>
 

    </div>
  </div>
</template>

<script>
export default {
  data() {
     var checkEmail=(rule,value,cb)=>{
       const regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+/
       if(regEmail.test(value)){
         return cb()
       }
       cb(new Error('请输入合法的邮箱'))
     }

    return {
      formrules:{
        username:[
          { required: true, message: '姓名必填!', trigger: 'blur' },
            { min: 2, max: 20, message: '姓名长度必须大于2', trigger: 'blur' }
        ],
        mobile:[
           { required: true, message: '手机号必填!', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号必须为11位', trigger: 'blur' }
        ],
        datatime:[
           { required: true, message: '生日必填!', trigger: 'blur' }
        ],
        customer:[
      { required: true, message: '来源必填!', trigger: 'blur' }
        ],
        password:[
           { required: true, message: '密码必填!', trigger: 'blur' },
            { min: 2, max: 16, message: '密码长度大于2', trigger: 'blur' }
        ],
        email:[
           { required: true, message: '邮箱必填!', trigger: 'blur' },
            { validator:checkEmail,trigger:'blur'}
        ]
      },
    

      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      value: '',
      queryinfo: {
        query: '',
        pagenum: '1',
        pagesize: '10',
      },
     
      total: '',
      userlist: [],
      newpage: '',
      diglog:false,
      userform:{
        name:'',
        password:'',
        email:'',
        mobile:''
      },
     
     
        
     
      form:{
        username:'',
        sex:1,  
        daratime:'',
        mobile:'',
        job:'',
        salary:'',
        idcard:'',
        customer:'',
        marriage:1,
        datatime:'',
        address:'',

      
  
      },
        options1: [{
          value: '政府机关',
          label: '政府机关'
        }, {
          value: '学生',
          label: '学生'
        }, {
          value: '离退休',
          label: '离退休'
        }, {
          value: '教师',
          label: '教师'
        }, {
          value: '白领',
          label: '白领'
        }, {
          value: '其他',
          label: '其他'
        }, {
          value: '家庭主妇',
          label: '家庭主妇'
        }, {
          value: '私营业主',
          label: '私营业主'
        }, {
          value: '公司高管',
          label: '公司高管'
        }, {
          value: '演艺人士',
          label: '演艺人士'
        }],
        value1: '',
         options2: [{
          value: '10000~20000',
          label: '10000~20000'
        },
        {
          value: '20000以上',
          label: '20000以上'
        },
        {
          value: '5000~10000',
          label: '5000~10000'
        },
        {
          value: '5000以下',
          label: '5000以下'
        }],
        value2:'',
         options3: [{
          value: '10000~20000',
          label: '会员介绍'
        },
        {
          value: '20000以上',
          label: '银行'
        },
        {
          value: '5000~10000',
          label: '朋友介绍'
        },
        {
          value: '5000以下',
          label: '银行'
        },
        {
          value: '5000以下',
          label: '企业'
        },
        {
          value: '5000以下',
          label: '团购'
        },
        {
          value: '5000以下',
          label: '营销活动(手机端)'
        },
        {
          value: '5000以下',
          label: '路过'
        },
        {
          value: '5000以下',
          label: '员工介绍'
        },
        {
          value: '5000以下',
          label: '老会员'
        }],
        value3:'',
        options4:[{
          value:'北京市',
          label:'北京市',
          children:[{
             value:'北京市',
          label:'北京市',
          children:[{
               value:'东城区',
               label:'东城区',
          },{
               value:'西城区',
               label:'西城区',
          },{
               value:'朝阳区',
               label:'朝阳区',
          },{
               value:'丰台区',
               label:'丰台区',
          },{
               value:'石景山区',
               label:'石景山区',
          },{
               value:'海淀区',
               label:'海淀区',
          },{
               value:'门头沟区',
               label:'门头沟区',
          },{
               value:'房山区',
               label:'房山区',
          },{
               value:'通州区',
               label:'通州区',
          },{
               value:'顺义区',
               label:'顺义区',
          },{
               value:'昌平区',
               label:'昌平区',
          },{
               value:'大兴区',
               label:'大兴区',
          },{
               value:'怀柔区',
               label:'怀柔区',
          },{
               value:'平谷区',
               label:'平谷区',
          },{
               value:'密云区',
               label:'密云区',
          },{
               value:'延庆区',
               label:'延庆区',
          }]
          }]
        },{
      value:'河北省',
          label:'河北省',
    },{
      value:'山西省',
          label:'山西省',
    },{
      value:'内蒙古自治区',
          label:'内蒙古自治区',
    },{
      value:'辽宁省',
          label:'辽宁省',
    },{
      value:'吉林省',
          label:'吉林省',
    },{
      value:'黑龙江省',
          label:'黑龙江省',
    },{
      value:'上海市',
          label:'上海市',
          children:[{
             value:'上海市',
          label:'上海市',
          children:[{
           value:'黄浦区',
          label:'黄浦区',
          },{
          value:'长宁区',
          label:'长宁区',
          },{
          value:'静安区',
          label:'静安区',
          },{
          value:'普陀区',
          label:'普陀区',
          },{
          value:'虹口区',
          label:'虹口区',
          },{
          value:'杨浦区',
          label:'杨浦区',
          },{
          value:'闵行区',
          label:'闵行区',
          },{
          value:'宝山区',
          label:'宝山区',
          },{
          value:'嘉定区',
          label:'嘉定区',
          },{
          value:'浦东新区',
          label:'浦东新区',
          },{
          value:'金山区',
          label:'金山区',
          },{
          value:'松江区',
          label:'松江区',
          },{
          value:'青浦区',
          label:'青浦区',
          },{
          value:'奉贤区',
          label:'奉贤区',
          },{
          value:'崇明区',
          label:'崇明区',
          }]
          }]
    },{
      value:'江苏省',
          label:'江苏省',
    },{
      value:'浙江省',
          label:'浙江省',
    },{
      value:'安徽省',
          label:'安徽省',
    },{
      value:'福建省',
          label:'福建省',
    },{
      value:'江西省',
          label:'江西省',
    },{
      value:'山东省',
          label:'山东省',
    },{
      value:'河南省',
          label:'河南省',
    },{
      value:'湖北省',
          label:'湖北省',
    },{
      value:'湖南省',
          label:'湖南省',
    },{
         value:'广东省',
          label:'广东省',
          children:[{
           value:'广州市',
          label:'广州市',
          children:[{
            value:'荔湾区',
          label:'荔湾区',
          },{
            value:'越秀区',
          label:'越秀区',
          },{
            value:'海珠区',
          label:'海珠区',
          },{
            value:'天河区',
          label:'天河区',
          },{
            value:'白云区',
          label:'白云区',
          },{
            value:'黄浦区',
          label:'黄浦区',
          },{
            value:'番禺区',
          label:'番禺区',
          },{
            value:'花都区',
          label:'花都区',
          },{
            value:'南沙区',
          label:'南沙区',
          },{
            value:'从化区',
          label:'从化区',
          },{
            value:'增城区',
          label:'增城区',
          }]
          },{
          value:'韶山市',
          label:'韶山市',
          },{
          value:'深圳市',
          label:'深圳市',
          children:[{

          },{
             value:'罗湖区',
             label:'罗湖区',
          },{
             value:'福田区',
             label:'福田区',
          },{
             value:'南山区',
             label:'南山区',
          },{
             value:'宝安区',
             label:'宝安区',
          },{
             value:'龙岗区',
             label:'龙岗区',
          },{
             value:'盐田区',
             label:'盐田区',
          },{
             value:'龙华区',
             label:'龙华区',
          },{
             value:'坪山区',
             label:'坪山区',
          },{
             value:'光明区',
             label:'光明区',
          }]
          },{
          value:'珠海市',
          label:'珠海市',
          },{
          value:'汕头市',
          label:'汕头市',
          },{
          value:'佛山市',
          label:'佛山市',
          },{
          value:'江门市',
          label:'江门市',
          },{
          value:'湛江市',
          label:'湛江市',
          },{
          value:'茂名市',
          label:'茂名市',
          },{
          value:'肇庆市',
          label:'肇庆市',
          },{
          value:'广东省',
          label:'惠州市',
          },{
          value:'梅州市',
          label:'梅州市',
          },{
          value:'汕尾市',
          label:'汕尾市',
          },{
          value:'河源市',
          label:'河源市',
          },{
          value:'阳江市',
          label:'阳江市',
          },{
          value:'清远市',
          label:'清远市',
          },{
          value:'东莞市',
          label:'东莞市',
          },{
          value:'中山市',
          label:'中山市',
          },{
          value:'潮汕市',
          label:'潮汕市',
          },{
          value:'揭阳市',
          label:'揭阳市',
          },{
          value:'云浮市',
          label:'云浮市',
          }]
    },{
      value:'广西壮族自治区',
          label:'广西壮族自治区',
    },{
      value:'海南省',
          label:'海南省',
    },{
      value:'重庆市',
          label:'重庆市',
    },{
      value:'四川省',
          label:'四川省',
    },{
      value:'贵州省',
          label:'贵州省',
    },{
      value:'云南省',
          label:'云南省',
    },{
      value:'西藏自治区',
          label:'西藏自治区',
      },
      {value:'陕西省',
          label:'陕西省',
    },{
      value:'天津甘肃省',
          label:'天津甘肃省',
    },{
      value:'宁夏回族自治区',
          label:'宁夏回族自治区',
    },{
      value:'新疆维吾尔自治区',
          label:'新疆维吾尔自治区',
    },{
      value:'台湾省',
          label:'台湾省',
    },{
      value:'香港特别行政区',
          label:'香港特别行政区',
    },{
      value:'澳门特别行政区',
          label:'澳门特别行政区',
    }],
    diglog1:false

    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    close2() {
      this.diglog = false
   this.$refs.yanzheng.resetFields()
    },
  async userstatechange( userinfo) {
     
     const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
        if(res.meta.status!==200){
          return this.$message.error('修改用户状态失败')
          this.userinfo=!this.userinfo
        }else{
          return this.$message.success('修改用户状态成功')
        }
   
     },
     
   
    handleSizeChange(newpage) {
      this.queryinfo.pagesize = newpage

      this.getUserList()
    },
    handleCurrentChange(pagenum) {
      this.queryinfo.pagenum = pagenum

      this.getUserList()
    },

    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryinfo,
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      } else {
        this.userlist = res.data.users
        this.total = res.data.total
      }
    },
  },
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 20px;
  height: 88vh;
}

.secondclass {
  display: flex;
  margin-top: 60px;
  margin-left: 10px;
}
.select {
  margin-left: 10px;
}

.select:hover {
  color: #40aeb6;
}
.addbutton {
  background-color: #40aeb6;
  color: #ffffff;
}
.el-row {
  margin-bottom: 20px;
}
.header-row-style {
  background-color: #e7ecf0;
}
.editbutton {
  background-color: #40aeb6;
  color: #ffffff;
}
.editbutton:hover {
  background-color: #40aeb6;
  color: #ffffff;
}
.el-pagination {
  margin-top: 20px;
  float: right;
}
.confirmclass{
  background-color: #40aeb6;
  color: #ffffff;
}
.buttonclass1{
  width: 230px;
}
.el-form-item{
  margin-left:60px;
}
.el-form-item__content{
  width: 300px;
}
.buttonclass2{
  width: 400px;
}
.el-dialog{
  margin-right: 500px;
}

</style>
