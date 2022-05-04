<template>
  <div>
    <el-container class="container">
      <el-header>
        <div>
          <div class="header">美丽田园商务运营管理系统</div>
          <div class="toggleboxright">
            <i class="iconfont icon-menu-fold" style="font-size: 18px"></i>
          </div>
          <div class="togglebox">
            <div class="togglemenu" @click="togglemenu()">
              <i class="iconfont icon-menu-fold" style="font-size: 18px"></i>
            </div>
          </div>
        </div>

        <div class="headerend">
          <div class="inputclass">
            <el-input placeholder="请输入顾客手机号查询"> </el-input>
          </div>
          <div class="togglemenuright">
            <table class="tableclass">
              <tr class="trclass">
                <td class="ulclass">
                  <i class="iconfont icon-bell iconclass"></i>
                </td>
                <td class="ulclass">
                  <i class="iconfont icon-folder iconclass"></i>
                </td>
                <td class="ulclass">
                  <i class="iconfont icon-folder-view iconclass"></i>
                </td>
                <td class="ulclass">
                  <i class="iconfont icon-fullscreen iconclass"></i>
                </td>
              </tr>
            </table>
          </div>
          <div class="loginexit">
         
          </div>

         <!-- 用户名区域--> 
       <span onmouseover="!this.isShow" onmouseout="!this.isShow" class="username" @click="exithome()">admin</span>
       <div class="userclass">
        <span v-show="this.isShow" >
          <p>清除缓存</p>
           <p>修改密码</p>
            <p><button @click="exithome()">修改密码</button></p>
        </span>
       </div>
        </div>
      </el-header>

      <!--主体区-->
      <el-container>
        <!--侧边栏-->
        <el-aside :width="iscollapse ? '56px' : '230px'">
          <el-menu
            :default-active="this.path"
            background-color="#263238"
            text-color="#fff"
            active-text-color="#40AEB6"
            unique-opened
            :collapse="iscollapse"
            :collapse-transition="false"
            :router="true"
          >
            <el-submenu
              :index="String(item.id)"
              v-for="item in tdstname"
              :key="item.id"
            >
              <template slot="title">
                <i :class="icontdst[item.id]"></i>
                <span class="asidefont">{{ item.authName }}</span>
              </template>
              <!-- 二级菜单-->
              <el-menu-item
                :index="'/'+subitem.path"
                v-for="subitem in item.children"
                :key="subitem.id"
                @click="savenewstate('/'+subitem.path)"
               
              >
                <template>
                  <i :class="icontdst1[subitem.id]"></i>
                  {{ subitem.authName }}
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>

        <!--内容区-->
        <el-main>
          <router-view></router-view>
      <!--    <div class="login_bg">
            <div class="login_left">
              <div class="login_welcome">
                <p class="welcome">欢迎您</p>
                <p class="welcome">使用美丽田园店务运营管理系统</p>
              </div>
            </div>
            <div class="login_right"></div>
          </div>    欢迎界面
          -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getMenutdst()
    this.getuser()
    this.path=window.sessionStorage.getItem('status')
  },
  data() {
    return {
      options: [
        {
          value: '',
          label: '{{this.user1}}',
        },
        {
          value: '',
          label: '修改密码',
        },
        {
          value: '',
          label: '退出',
        },
      
      ],
      value: '',
      iscollapse: false,
      active: true,
      user: '',
      activepath:'',
     isShow:false,
      show: false,
      path:'',
      tdstname: [],
      icontdst: {
        125: 'iconfont icon-team',
        103: 'iconfont icon-lock',
        101: 'iconfont icon-shopping-cart ',
        102: 'iconfont icon-schedule ',
        145: 'iconfont icon-save ',
      },
      icontdst1: {
        110: 'iconfont icon-user ',
        111: 'iconfont icon-solution ',
        112: 'iconfont icon-audit ',
        104: 'iconfont icon-gift ',
        115: 'iconfont icon-border-inner ',
        121: 'iconfont  icon-schedule ',
        107: 'iconfont icon-appstore ',
        146: 'iconfont icon-account-book ',
      },
    }
  },
  methods: {
    //保存点击菜单的状态
    savenewstate(item){
      window.sessionStorage.setItem('status',item)
      this.path=item

    },
  onshow(){
    this.isShow=!this.isShow
  },

 
    getuser() {
      const user = sessionStorage.getItem('user')
     
      
    },
    togglemenu() {
      this.iscollapse = !this.iscollapse
    },
    exithome() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },

    async getMenutdst() {
      const { data: res } = await this.$http.get('menus')

      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.tdstname = res.data
    },
  },
}
</script>

<style lang="less" scoped>
.username{
  color: #fff;
}
.el-main {
  background-color: #fbfbfb;
}

.header {
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  margin-top: 14px;
  float: left;
}
.el-aside {
  background-color: #263238;
}
.container {
  height: 100vh;
}
.el-header {
  background-color: #40aeb6;

  display: flex;
  justify-content: space-between;

  height: 50px !important;
  padding: 0 10px;
}
.asidefont {
  font-size: 14px;
}
.el-menu {
  border-right: none;
}





.togglemenu {
  cursor: pointer;
  color: #fff;

  font-weight: 500;
  font-size: 18px;
}

.togglemenuright {

  cursor: pointer;
  color: #fff;
  margin-left: 15px;

  font-weight: 500;
  font-size: 18px;
  height: 50px !important;

  position: relative;
}
.headerend {
  display: flex;
  height: 50px !important;
 padding-right: 10px;
  align-items: center;
}
.loginexit {
  display: flex;
  height: 100%;
  background: #36949b;
}
.iconclass {
  display: -moz-intdne-box;
  text-align: center;
}
.ulclass {
  width: 20px !important;
  font-size: 18px;
  padding: 10px 15px;
  margin: 0;
}
.ulclass:hover {
  background-color: #36949b;
  height: fit-content;
}
.el-input {
  padding: 5px 20px;
  width: 196px;

  


}

.inputclass:hover {
  background-color: #36949b;
 
}
.tableclass {
  line-height: 26px;
}

.togglebox {
  height: 50px;
  float: right;
  padding: 0 15px;
  margin-left: 5px;
  padding-top: 15px;
  cursor: pointer;
}
.togglebox:hover {
  background-color: #36949b;
}
.toggleboxright {
  float: right;

  color: #fff;
  font-weight: 500;
  font-size: 18px;
  height: 50px;
  padding: 15px 15px;
  cursor: pointer;
}
.toggleboxright:hover {
  background-color: #36949b;
}
.userclass{
  display: block;
  height: 100px;
  width: 100px;
  position: absolute;
  right: 30%;
}
</style>
