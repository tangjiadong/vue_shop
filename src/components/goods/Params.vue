<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert show-icon title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false"></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类: </span>
          <!-- 级联选择框 -->
          <el-cascader expand-trigger="hover" v-model="selectedCateKeys" :options="catelist" :props="cateProps"
            @change="handleChange" clearable>
          </el-cascader>
        </el-col>
      </el-row>

      <!-- Tabs 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabChange">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catelist: [],
      selectedCateKeys: '',
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      activeName: 'many',
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status != 200) {
        return this.$message.error('获取商品分类失败!')
      }
      this.catelist = res.data
      // console.log(res.data)
    },
    handleChange() {
      // 证明选择的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        return
      }
      //证明选中的是三级分类
      console.log(this.selectedCateKeys)
    },
    handleTabChange() {
      console.log(this.activeName)
    },
  },
  computed: {
    //如果按钮需要被禁用,则返回true,否则返回false
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    //当前选中的三级分类Id
    cateId(){
      if(this.selectedCateKeys.length === 3){
        return this.selectedCateKeys[2]
      }
      return null
    }
  },
}
</script>

<style scoped>
.cat_opt {
  margin: 15px 0;
}
</style>