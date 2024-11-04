<!--
 * @Author      : Mr.bin
 * @Date        : 2024-10-07 15:23:00
 * @LastEditTime: 2024-10-09 11:27:40
 * @Description : 修改传感器K值
-->
<template>
  <div class="set-k">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回首页"
        content="修改传感器K值"
        @back="handleToHome"
      ></el-page-header>

      <div class="box">
        <el-row class="row">
          <el-col :span="6">
            <div class="item title">工位</div>
          </el-col>
          <el-col :span="6">
            <div class="item title">K2</div>
          </el-col>
          <el-col :span="6">
            <div class="item title">K3</div>
          </el-col>
          <el-col :span="6">
            <div class="item title">K4</div>
          </el-col>
        </el-row>

        <el-row class="row" v-for="item of sensor_k" :key="item.gg">
          <el-divider></el-divider>
          <el-col :span="6">
            <div class="item">{{ item.gg }}</div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <el-input-number
                v-model="item.k2"
                :precision="1"
              ></el-input-number>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <el-input-number
                v-model="item.k3"
                :precision="1"
              ></el-input-number>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <el-input-number
                v-model="item.k4"
                :precision="1"
              ></el-input-number>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-divider></el-divider>

      <div class="btn">
        <el-button class="item" type="danger" @click="handleToHome"
          >返回首页</el-button
        >
        <el-button class="item" type="success" @click="handleSaveSensorK"
          >保 存</el-button
        >
        <el-button class="item" type="primary" @click="handleRefresh"
          >刷新页面</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-k',

  data() {
    return {
      sensor_k: []
    }
  },

  created() {
    this.getSensorK()
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
     * @description: 刷新页面函数
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/set-k'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 获取传感器的K2~K4
     */
    getSensorK() {
      this.sensor_k = JSON.parse(window.localStorage.getItem('sensor_k'))
    },

    /**
     * @description: 保存按钮
     */
    handleSaveSensorK() {
      window.localStorage.setItem('sensor_k', JSON.stringify(this.sensor_k))

      /* 成功 */
      this.$message({
        message: `K值保存成功`,
        type: 'success',
        duration: 2500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-k {
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
    padding: 80px 20px 0 20px;

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
      font-size: 28px;
      margin: 15px 60px;
    }
  }
}
</style>
