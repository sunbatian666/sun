<template>
  <div class="login_bg">
    <div class="login_left">
      <div class="img_box">
        <img src="../assets/img/bg1.png" style="z-index: 999" />
        <p class="bodynumber">客户导向 协同绩效 持续创新</p>
        <p class="bodybottom">@孙霸天666</p>
      
      </div>
    </div>
    <div class="login_right">
      <div class="login_user">
        <el-form
          ref="loginref"
          class="bns"
          :model="loginform"
          :rules="loginrule"
          resetField
        >
          <p class="p1">Hello!</p>
          <p class="p2">
            欢迎您<span class="denglu">登录</span>美丽田园店务运营管理系统
          </p>

          <el-form-item label="账号" class="put1" prop="username" ref="refs">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user-solid"
              v-model="loginform.username"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="密码"
            class="put1"
            type="password"
            prop="password"
          >
            <el-input
              placeholder="请输入密码"
              prefix-icon="iconfont icon-3702mima"
              v-model="loginform.password" 
              type="password"   
            ></el-input>
          </el-form-item>

          <el-form-item>
            <button class="button1" @click="loginvalidate()" >登录</button>
            <button class="button1" @click="reset()">重置</button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginform: {
        username: 'admin',
        password: '123456',
        
      },
    
      //表单验证规则
      loginrule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur',
          },
        ],

        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    reset() {
      this.loginform.username = ''
      this.loginform.password = ''
    },
    loginvalidate() {
      this.$refs.loginref.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginform)
     
    
   
        
        if (res.meta.status !== 200) {
          this.$message.error('登录失败')
        }else{
           
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('user',res.data.username)
        this.$router.push('/home')}
      })
    },
  },
}
</script>



<style lang='less' scoped>
.login_bg {
  height: 100%;
  width: 100%;
 
}

.login_left {
  float: left;
  height: 100%;
  width: 66.9%;
  background-color: #fff;
  background-image: url('../assets/img/bg3.png');
  background-size: 100%;
  
}

.img_box::before {
  content: '';
  position:absolute;
  width: 100%;
  height: 100%;
  margin-left: -55.7%;
  margin-top: -16.25%;
  background: rgba(0, 0, 0, 0.6);
}

.img_box {
  margin-left: 33.7%;
  margin-top: 24.3%;
}
.img_box img {
  width: 21vw;
  border-style: none;
  z-index: 999;
  position: absolute;
 
}

.login_right {
 
  float: left;
  width: 33.1%;
  height: 100%;
 
}
.login_user {
  height: 100%;
  width: 70%;
  margin-top: 29%;
  margin-left: 100px;
 
}
.bns .p1 {
  color: rgba(0, 0, 0, 0.85);
  font-size: 36px;
  font-weight: 500;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
}
.bns .p2 {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  margin-bottom: 30px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, '\5FAE\8F6F\96C5\9ED1', Arial, sans-serif;
}
.put1 {
  margin-bottom: 30px;
  width: 99%;
}
.denglu {
  color: rgb(86, 214, 214);
}
.button1 {
  background: #3b3b3b;
  border-radius: 30px;
  font-size: 1vw;
  margin-top: 10px;

  width: 10vw;
  height: 2.8vw;
  color: #fff;
  margin-left: 15px;
  border: 0;
  
}
.bodynumber {
  position: absolute;
  color: #fff;
  box-sizing: border-box;
  font-size: 2vw;
  margin-top: 10.4%;
  margin-left: -2.7%;
  
}
.bodybottom {
  position: absolute;
  left: 33%;
  bottom: 5%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  color: #fff;
  box-sizing: border-box;
  z-index: 999;
}
</style>
