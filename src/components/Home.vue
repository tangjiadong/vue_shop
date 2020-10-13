<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>周博通企业版</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header
    >
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>  
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#313744" text-color="#cdcdcd" 
        active-text-color="#409EFF" :unique-opened="true" :collapse="isCollapse"
        :collapse-transition="false" :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" 
            :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
      return {
          //左侧菜单数据
          menuList: [],
          iconsObj: {
              '125': 'iconfont icon-user',
              '103': 'iconfont icon-tijikongjian',
              '101': 'iconfont icon-3702mima',
              '102': 'iconfont icon-danju',
              '145': 'iconfont icon-baobiao',
          },
          //是否折叠
          isCollapse: false,
          //被激活的链接地址
          activePath: ''
      }
  },  
  created(){
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      //清空token
      window.sessionStorage.clear()
      //跳转到登录页
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMenuList(){
        const {data: res} = await this.$http.get('menus')
        if(res.meta.status != 200) return this.$message.error(res.meta.msg)
        this.menuList = res.data
        console.log(res)
    },
    //点击按钮,切换菜单的折叠和展开
    toggleCollapse(){
        this.isCollapse = ! this.isCollapse
    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath;
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #363d40;
  display: flex;
  justify-content: space-between; //两端对齐
  padding-left: 0;
  align-items: center; //退出按钮垂直居中
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #313744;
  //去除侧边栏凸出部分
  .el-menu{
      border-right: none;
  }
}
.el-main {
  background-color: #e9edf1;
}
.home-container {
  height: 100%; //撑满全屏
}
.iconfont{
    margin-right: 10px;
}
.toggle-button{
    background-color: #485164;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align-last: center;
    letter-spacing: 0.2em;//线之间间隔加大
    cursor: pointer;//指针放上面变小手
}
</style>