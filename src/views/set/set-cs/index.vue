<!--
 * @Author      : Mr.bin
 * @Date        : 2024-12-16 11:39:03
 * @LastEditTime: 2024-12-18 17:32:02
 * @Description : 3个常数项：等高常数、到A常数、到B常数
-->
<template>
  <div class="set-cs">
    <el-page-header
      class="page"
      title="返回首页"
      content="修改3个标准值（也即常数项）"
      @back="handleToHome"
    ></el-page-header>

    <div class="box">
      <el-row class="row">
        <el-col :span="2">
          <div class="item title">规格</div>
        </el-col>
        <el-col :span="2">
          <div class="item title">型号</div>
        </el-col>
        <el-col :span="5">
          <div class="item title">标准滑块二维码号</div>
        </el-col>
        <el-col :span="5">
          <div class="item title">等高</div>
        </el-col>
        <el-col :span="5">
          <div class="item title">到A</div>
        </el-col>
        <el-col :span="5">
          <div class="item title">到B</div>
        </el-col>
      </el-row>

      <el-row class="row" v-for="(item, index) of cs" :key="index">
        <el-divider></el-divider>
        <el-col :span="2">
          <div class="item">{{ item.gg }}</div>
        </el-col>
        <el-col :span="2">
          <div class="item">{{ item.xh }}</div>
        </el-col>
        <el-col :span="5">
          <div class="item">
            <el-input v-model="item.QRCode"></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="item">
            <el-input-number
              v-model="item.dgCS"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="item">
            <el-input-number
              v-model="item.toACS"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="item">
            <el-input-number
              v-model="item.toBCS"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="danger" @click="handleToHome"
        >返回首页</el-button
      >
      <el-button class="item" type="success" @click="handleSaveCS"
        >保 存</el-button
      >
      <el-button class="item" type="primary" @click="handleRefresh"
        >刷新页面</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-cs',

  data() {
    return {
      cs: []
    }
  },

  created() {
    this.getCS()
  },

  methods: {
    /**
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/'
      })
    },

    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/set-cs'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 获取常数项
     */
    getCS() {
      this.cs = JSON.parse(window.localStorage.getItem('cs'))
    },

    /**
     * @description: 保存按钮
     */
    handleSaveCS() {
      window.localStorage.setItem('cs', JSON.stringify(this.cs))

      /* 成功 */
      this.$message({
        message: `常数项修改成功`,
        type: 'success',
        duration: 2500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-cs {
  width: 100%;
  height: 100%;
  position: relative;

  .page {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .box {
    width: 100%;
    padding: 50px 5px 0 5px;

    .row {
      .title {
        font-weight: 700;
      }
      .item {
        height: 40px;
        @include flex(row, center, center);
        font-size: 24px;
      }
    }
  }

  .btn {
    @include flex(row, center, center);
    .item {
      margin: 10px 60px;
      font-size: 28px;
    }
  }
}
</style>
