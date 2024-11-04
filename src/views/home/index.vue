<!--
 * @Author      : Mr.bin
 * @Date        : 2024-03-12 15:11:07
 * @LastEditTime: 2024-10-09 11:25:08
 * @Description : home
-->
<template>
  <div class="home" v-loading.fullscreen.lock="isSaveing">
    <!-- 被测滑块部分 -->
    <div class="slider">
      <!-- 上侧数值显示 -->
      <div class="main">
        <!-- 规格型号选择 -->
        <div class="gx">
          <!-- 规格 -->
          <div class="spec">
            <div class="text">规格</div>
            <el-select
              v-model="specValue"
              placeholder="请选择规格"
              @change="specChange"
            >
              <el-option
                v-for="item in specSelection"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <!-- 型号 -->
          <div class="model">
            <div class="text">型号</div>
            <el-select
              v-model="modelValue"
              placeholder="请选择型号"
              @change="modelChange"
            >
              <el-option
                v-for="item in modelSelection"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 二维码 -->
        <div class="QRCode">
          <span class="text">二维码：</span>
          <div>
            <el-input
              ref="QRCodeInput"
              placeholder="建议不要手输，请用扫码枪"
              maxlength="8"
              v-model="QRCode"
            ></el-input>
          </div>
          <div class="btn">
            <el-button class="btn-item" type="primary" @click="handleRescan"
              >清空二维码</el-button
            >
          </div>
        </div>

        <!-- 按钮组 -->
        <div class="btn-bom">
          <el-button class="item" type="primary" @click="handleBtnRefresh"
            >刷新页面</el-button
          >
          <el-button class="item" type="primary" @click="handleClearStandard"
            >清空标定值</el-button
          >
          <el-button class="item" type="warning" @click="handleToSensorK"
            >修改 K 值</el-button
          >
          <el-button class="item" type="warning" @click="handleSensorDialog"
            >调整传感器位置</el-button
          >
        </div>
      </div>

      <!-- 实时显示4个传感器的数字量 -->
      <div class="show">
        <div class="text">实时值：</div>
        <div class="item">{{ showSensorArray[0] }}</div>
        <div class="item">{{ showSensorArray[1] }}</div>
        <div class="item">{{ showSensorArray[2] }}</div>
        <div class="item">{{ showSensorArray[3] }}</div>
      </div>

      <!-- 显示按键按下时的原始数据 -->
      <div class="show-2">成品滑块数据数组：{{ finishSliderArray }}</div>
      <div class="show-2">标准滑块数据数组：{{ standardSliderArray }}</div>

      <!-- 下侧表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="100%"
          :default-sort="{ prop: 'riqi', order: 'descending' }"
          :stripe="false"
          :border="true"
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <!-- No -->
          <el-table-column
            align="center"
            type="index"
            label="No"
            width="50"
          ></el-table-column>
          <!-- 二维码 -->
          <el-table-column align="center" prop="sxm" label="二维码" />
          <!-- 规格型号 -->
          <el-table-column
            align="center"
            prop="xhgg"
            label="规格型号"
            width="140"
          />
          <!-- 中心距评审结果 -->
          <el-table-column
            align="center"
            prop="zxj"
            label="中心距评审结果 (0不合格，1合格)"
            width="100"
          />
          <!-- 等高 -->
          <el-table-column align="center" prop="dg" label="等高" width="80" />
          <!-- 到A -->
          <el-table-column align="center" prop="daoa" label="到A" width="80" />
          <!-- 到B -->
          <el-table-column align="center" prop="daob" label="到B" width="80" />
          <!-- A平行 -->
          <el-table-column align="center" prop="apx" label="A平行" width="80" />
          <!-- B平行 -->
          <el-table-column align="center" prop="bpx" label="B平行" width="80" />
          <!-- 精度等级 -->
          <el-table-column
            align="center"
            prop="dengji"
            label="精度等级"
            width="80"
          />
          <!-- 备注 -->
          <el-table-column
            align="center"
            prop="beizhu"
            label="备注 (互换性)"
            width="100"
          />
          <!-- 测量时间 -->
          <el-table-column
            align="center"
            prop="riqi"
            label="测量时间"
            width="220"
            sortable
          />

          <!-- 删除按钮 -->
          <el-table-column label="删除操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDeleteTableData(scope.$index, scope.row)"
                >删 除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 调整传感器位置 -->
    <el-dialog
      title="调整传感器位置"
      :visible.sync="sensorDialogVisible"
      width="30%"
      top="20vh"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="dialog-box">
        <div>
          2号传感器：<span class="item">{{
            showSensorArray[1] - showZeroSensorArray[1]
          }}</span>
        </div>
        <div>
          3号传感器：<span class="item">{{
            showSensorArray[2] - showZeroSensorArray[2]
          }}</span>
        </div>
        <div>
          4号传感器：<span class="item">{{
            showSensorArray[3] - showZeroSensorArray[3]
          }}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sensorDialogVisible = false"
          >关 闭</el-button
        >
      </span>
    </el-dialog>

    <!-- 开发者页按钮 -->
    <el-button
      class="btn-developer"
      type="info"
      size="mini"
      @click="handleToDeveloper"
      >Developer</el-button
    >
    <!-- 打开控制台按钮 -->
    <el-button
      class="btn-control"
      type="info"
      size="mini"
      @click="handleOpenDev"
      >Open Dev</el-button
    >
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'home',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      /* 状态标志位 */
      isSaveing: false, // 计算和调用api状态

      /* 服务器地址ip */
      ip: '',

      /* 传感器K2~K4的值 */
      sensor_k: [],

      /* 调整传感器螺丝时专用 */
      sensorDialogVisible: false,
      showZeroSensorArray: [],

      /* 规格（外协滑块暂时没有35与45） */
      specValue: '',
      specSelection: [
        {
          value: '15'
        },
        {
          value: '20'
        },
        {
          value: '25'
        },
        {
          value: '30'
        }
        // {
        //   value: '35'
        // },
        // {
        //   value: '45'
        // }
      ],
      /* 型号 */
      modelValue: '',
      modelSelection: [
        {
          value: 'AA'
        },
        {
          value: 'EA'
        },
        {
          value: 'AN'
        },
        {
          value: 'HAA'
        },
        {
          value: 'HEA'
        },
        {
          value: 'HAN'
        },
        {
          value: 'DA'
        }
      ],

      /* 二维码编号（滑块的身份证） */
      QRCode: '',

      /* 表格 */
      tableData: [],
      tableLoading: false, // 表格加载动画

      /* 实时显示4个传感器的数据数组，一维数组 */
      showSensorArray: [],
      /* 标准滑块数据数组，二维数组 */
      standardSliderArray: [],
      /* 成品滑块数据数组，二维数组 */
      finishSliderArray: [],

      /* 滑块的最终精度结果 */
      centerSpacing: 0, // 中心距的评审结果（1：合格，0：不合格）
      dg: 0, // 等高
      toA: 0, // 沟槽到A
      toB: 0, // 沟槽到B
      aParallel: 0, // A平行
      bParallel: 0, // B平行
      accuracyClass: '', // 精度等级
      remark: '' // 备注（E级互换、N级互换、不发互换、报废）
    }
  },

  created() {
    /* 从Vuex中获取规格、型号的初始值 */
    this.specValue = this.$store.state.spec
    this.modelValue = this.$store.state.model

    /* 获取标准滑块数据数组 */
    this.standardSliderArray = JSON.parse(
      window.sessionStorage.getItem('standard_slider_value')
    )

    /* 获取服务器地址IP */
    this.ip = window.localStorage.getItem('ip')

    /* 获取传感器的K2~K4 */
    this.sensor_k = JSON.parse(window.localStorage.getItem('sensor_k'))

    /* 开启串口通信 */
    this.initSerialPort()

    /* 获取表格数据 */
    this.getTableData()
  },
  mounted() {
    /* 二维码输入框获取鼠标焦点 */
    this.QRFocus()
  },
  beforeDestroy() {
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
    /**
     * @description: 刷新页面函数
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 刷新页面按键（二次确认弹窗）
     */
    handleBtnRefresh() {
      this.$confirm('是否要刷新页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      })
        .then(() => {
          this.handleRefresh()
        })
        .catch(() => {})
    },

    /**
     * @description: 调整传感器位置
     */
    handleSensorDialog() {
      if (this.showSensorArray.length === 0) {
        this.$message({
          message: `请先选择规格和型号！`,
          type: 'error',
          duration: 3000
        })
      } else {
        this.$confirm('请确保在"没有"套滑块的前提下，才进行该操作！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          type: 'warning'
        })
          .then(() => {
            this.showZeroSensorArray = this.showSensorArray
            this.sensorDialogVisible = true
          })
          .catch(() => {})
      }
    },

    /**
     * @description: 获取表格数据
     */
    getTableData() {
      if (this.ip !== '') {
        this.tableLoading = true
        // 延迟500ms再查询，因为数据库插入有延迟
        setTimeout(() => {
          const api = `http://${this.ip}/st_t6_sql_001_slide_detection/public/index.php/slideDetection/getSlideDetectionData`
          this.$axios
            .post(api, {
              num: 50 // 默认获取最新的n条，并且是T开头的才查询出来，因为凯特和双特共用同一个数据表
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.tableData = data.result
              } else if (data.status === 0) {
                /* 失败 */
                this.$message({
                  message: `表格数据获取失败`,
                  type: 'error',
                  duration: 5000
                })
              }
            })
            .catch(err => {
              this.$alert(
                `[获取表格数据-环节]，请联系技术员重新开启VPN ${err}`,
                '服务器VPN断开',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {
              this.tableLoading = false
            })
        }, 300)
      } else {
        this.$message({
          message: `服务器ip为空，请联系技术员去设置ip`,
          type: 'error',
          duration: 5000
        })
      }
    },

    /**
     * @description: 删除数据按钮
     * @param {*} index
     * @param {*} row
     */
    handleDeleteTableData(index, row) {
      this.$confirm('此操作将"永久删除"该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const api = `http://${this.ip}/st_t6_sql_001_slide_detection/public/index.php/slideDetection/deleteSlideDetectionData`
          this.$axios
            .post(api, {
              sxm: row.sxm
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.$message({
                  message: `删除成功`,
                  type: 'success',
                  duration: 2000
                })
              } else if (data.status === 0) {
                /* 失败 */
                this.$message({
                  message: `删除失败`,
                  type: 'error',
                  duration: 5000
                })
              }
            })
            .catch(err => {
              this.$alert(`[删除-环节] ${err}`, '断网了，请联系技术员', {
                type: 'error',
                showClose: false, // 是否显示右上角关闭按钮
                center: false, // 是否居中布局
                confirmButtonText: '刷新页面', // 确定按钮的文本内容
                callback: () => {
                  this.handleRefresh()
                }
              })
            })
            .finally(() => {
              this.getTableData() // 重新获取表格数据（也即刷新表格）
            })
        })
        .catch(() => {})
    },

    /**
     * @description: 覆盖数据弹窗
     */
    updateTableData() {
      this.$confirm(
        '数据库中已存在这个二维码的滑块数据, 是否要覆盖旧数据?',
        '重 测 提 示',
        {
          confirmButtonText: '覆 盖',
          cancelButtonText: '取 消',
          type: 'warning',
          center: true,
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }
      )
        .then(() => {
          const api = `http://${this.ip}/st_t6_sql_001_slide_detection/public/index.php/slideDetection/updateSlideDetectionData`
          this.$axios
            .post(api, {
              sxm: this.QRCode,
              xhgg: 'TSGS' + this.specValue + this.modelValue,
              zxj: this.centerSpacing,
              dg: this.dg,
              daoa: this.toA,
              daob: this.toB,
              apx: this.aParallel,
              bpx: this.bParallel,
              dengji: this.accuracyClass,
              beizhu: this.remark
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.$message({
                  message: `覆盖成功`,
                  type: 'success',
                  duration: 2000
                })
                // 成品滑块数据数组清空
                this.finishSliderArray = []
              } else if (data.status === 0) {
                /* 失败 */
                this.$alert(
                  `覆盖失败，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              } else {
                /* 其他错误 */
                this.$alert(
                  `其他错误，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              }
            })
            .catch(err => {
              this.$alert(`[覆盖-环节] ${err}`, '断网了，请联系技术员', {
                type: 'error',
                showClose: false, // 是否显示右上角关闭按钮
                center: false, // 是否居中布局
                confirmButtonText: '刷新页面', // 确定按钮的文本内容
                callback: () => {
                  this.handleRefresh()
                }
              })
            })
            .finally(() => {
              // 二维码编号自增
              this.QRCodeAdd()
              this.getTableData()
            })
        })
        .catch(() => {
          // 成品滑块数据数组清空
          this.finishSliderArray = []
        })
    },

    /**
     * @description: 打开控制台
     */
    handleOpenDev() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^htpm$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          try {
            remote.getCurrentWebContents().openDevTools()
          } catch (err) {
            this.$message({
              type: 'error',
              message: `打开控制台失败：${err}`
            })
          }
        })
        .catch(() => {})
    },
    /**
     * @description: 前往开发者页
     */
    handleToDeveloper() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^htpm$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          this.$router.push({
            path: '/set-developer'
          })
        })
        .catch(() => {})
    },
    /**
     * @description: 前往修改传感器K2~K4页
     */
    handleToSensorK() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^st$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          this.$router.push({
            path: '/set-k'
          })
        })
        .catch(() => {})
    },

    /**
     * @description: 重扫二维码按钮
     */
    handleRescan() {
      this.QRCode = ''
      this.QRFocus() // 二维码输入框获取鼠标焦点
    },

    /**
     * @description: 二维码输入框获取鼠标焦点函数
     */
    QRFocus() {
      this.$refs.QRCodeInput.focus()
    },

    /**
     * @description: 规格下拉框的选中值发生变化时触发
     */
    specChange() {
      // Vuex更新一下规格
      this.$store.dispatch('changeSpec', this.specValue)

      // 清空标准滑块数据数组
      this.standardSliderArray = []
      window.sessionStorage.setItem('standard_slider_value', JSON.stringify([]))
    },
    /**
     * @description: 型号下拉框的选中值发生变化时触发
     */
    modelChange() {
      // Vuex更新一下型号
      this.$store.dispatch('changeModel', this.modelValue)

      // 清空标准滑块数据数组
      this.standardSliderArray = []
      window.sessionStorage.setItem('standard_slider_value', JSON.stringify([]))
    },

    /**
     * @description: 清空标定值按钮（包括sessionStorage里面的）
     */
    handleClearStandard() {
      this.$confirm('是否要清空标定值?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      })
        .then(() => {
          this.standardSliderArray = []
          window.sessionStorage.setItem(
            'standard_slider_value',
            JSON.stringify([])
          )
          this.$message({
            message: `标定值清空完成`,
            type: 'success',
            duration: 5000
          })
        })
        .catch(() => {})
    },

    /**
     * @description: 二维码编号自增（方便操作工不用每次都扫码）
     */
    QRCodeAdd() {
      const QRCodeArray = this.QRCode.split('')
      if (QRCodeArray[0] !== 'T' || QRCodeArray.length !== 8) {
        // 首位不是T，或者总长度不是8位，表示出错了
        this.QRCode = ''
      } else {
        if (QRCodeArray[1] !== '0') {
          const num =
            QRCodeArray[1] +
            QRCodeArray[2] +
            QRCodeArray[3] +
            QRCodeArray[4] +
            QRCodeArray[5] +
            QRCodeArray[6] +
            QRCodeArray[7]
          const num_res = parseInt(num) + 1
          if (num_res === 10000000) {
            this.QRCode = '' // 溢出
          } else {
            this.QRCode = `T${num_res}`
          }
        } else if (QRCodeArray[1] === '0') {
          if (QRCodeArray[2] !== '0') {
            const num =
              QRCodeArray[2] +
              QRCodeArray[3] +
              QRCodeArray[4] +
              QRCodeArray[5] +
              QRCodeArray[6] +
              QRCodeArray[7]
            const num_res = parseInt(num) + 1
            if (num_res === 1000000) {
              this.QRCode = `T${num_res}`
            } else {
              this.QRCode = `T0${num_res}`
            }
          } else if (QRCodeArray[2] === '0') {
            if (QRCodeArray[3] !== '0') {
              const num =
                QRCodeArray[3] +
                QRCodeArray[4] +
                QRCodeArray[5] +
                QRCodeArray[6] +
                QRCodeArray[7]
              const num_res = parseInt(num) + 1
              if (num_res === 100000) {
                this.QRCode = `T0${num_res}`
              } else {
                this.QRCode = `T00${num_res}`
              }
            } else if (QRCodeArray[3] === '0') {
              if (QRCodeArray[4] !== '0') {
                const num =
                  QRCodeArray[4] +
                  QRCodeArray[5] +
                  QRCodeArray[6] +
                  QRCodeArray[7]
                const num_res = parseInt(num) + 1
                if (num_res === 10000) {
                  this.QRCode = `T00${num_res}`
                } else {
                  this.QRCode = `T000${num_res}`
                }
              } else if (QRCodeArray[4] === '0') {
                if (QRCodeArray[5] !== '0') {
                  const num = QRCodeArray[5] + QRCodeArray[6] + QRCodeArray[7]
                  const num_res = parseInt(num) + 1
                  if (num_res === 1000) {
                    this.QRCode = `T000${num_res}`
                  } else {
                    this.QRCode = `T0000${num_res}`
                  }
                } else if (QRCodeArray[5] === '0') {
                  if (QRCodeArray[6] !== '0') {
                    const num = QRCodeArray[6] + QRCodeArray[7]
                    const num_res = parseInt(num) + 1
                    if (num_res === 100) {
                      this.QRCode = `T0000${num_res}`
                    } else {
                      this.QRCode = `T00000${num_res}`
                    }
                  } else if (QRCodeArray[6] === '0') {
                    if (QRCodeArray[7] !== '0') {
                      const num = QRCodeArray[7]
                      const num_res = parseInt(num) + 1
                      if (num_res === 10) {
                        this.QRCode = `T00000${num_res}`
                      } else {
                        this.QRCode = `T000000${num_res}`
                      }
                    } else if (QRCodeArray[7] === '0') {
                    }
                  }
                }
              }
            }
          }
        }
      }
    },

    /**
     * @description: 串口通信
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的COM口，取第一个作为COM口，一般是COM口号小的那个 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          if (comPath) {
            this.$notify({
              title: '通知',
              message: `连接到串口：${comPath}`,
              type: 'success',
              position: 'bottom-right',
              duration: 2500
            })

            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: true // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              /* 第0步：如果save函数正在执行，就不进行下面的逻辑，防止出bug */
              if (this.isSaveing === false) {
                /* 第1步：获取数据，并对数据进行预处理 */
                // console.log(data)
                const dataArray = data.split(',')
                for (let i = 0; i < dataArray.length; i++) {
                  dataArray[i] = parseInt(dataArray[i]) // 字符串类型转成整数类型
                }
                // 按键的键值（0-没有按键，1-标定按键，2-测量按键，3-清空按键）
                const keyNum = dataArray[0]
                // 工位1（15或30）
                const workstation_1 = [
                  dataArray[1],
                  dataArray[2],
                  dataArray[3],
                  dataArray[4]
                ]
                // 工位2（20或35）
                const workstation_2 = [
                  dataArray[5],
                  dataArray[6],
                  dataArray[7],
                  dataArray[8]
                ]
                // 工位3（25或45）
                const workstation_3 = [
                  dataArray[9],
                  dataArray[10],
                  dataArray[11],
                  dataArray[12]
                ]

                /* 第2步：根据不同工位进行后续处理 */
                // 先判断是否选择了规格和型号，都选择了才进行后续处理
                if (this.specValue === '' || this.modelValue === '') {
                } else {
                  if (this.specValue === '15' || this.specValue === '30') {
                    /* 工位1或工位4（15或30） */
                    if (keyNum === 0) {
                      // 没有按键按下，此时就单纯在界面上实时显示4个传感器的数字量，一维数组
                      this.showSensorArray = workstation_1
                    } else if (keyNum === 1) {
                      // 标定按键按下，此时就把数据存入到标准滑块数据数组，二维数组
                      if (this.standardSliderArray.length <= 2) {
                        // 按第1~3下
                        this.standardSliderArray.push([
                          workstation_1[0],
                          workstation_1[1],
                          workstation_1[2],
                          workstation_1[3]
                        ])
                      } else if (this.standardSliderArray.length === 3) {
                        // 按第4下
                        this.standardSliderArray.push([
                          workstation_1[0],
                          workstation_1[1],
                          workstation_1[2],
                          workstation_1[3]
                        ])
                        // 标定完成，标定值保存到SessionStorage
                        window.sessionStorage.setItem(
                          'standard_slider_value',
                          JSON.stringify(this.standardSliderArray)
                        )
                        this.$message({
                          message: `标定完成`,
                          type: 'success',
                          duration: 5000
                        })
                      }
                    } else if (keyNum === 2) {
                      // 测量按键按下，此时就把数据存入到成品滑块数据数组，二维数组
                      if (this.finishSliderArray.length <= 2) {
                        // 按第1~3下
                        this.finishSliderArray.push([
                          workstation_1[0],
                          workstation_1[1],
                          workstation_1[2],
                          workstation_1[3]
                        ])
                      } else if (this.finishSliderArray.length === 3) {
                        // 按第4下
                        this.finishSliderArray.push([
                          workstation_1[0],
                          workstation_1[1],
                          workstation_1[2],
                          workstation_1[3]
                        ])
                        // 测量完成，调用save函数，计算结果并调用后端API
                        this.save()
                      }
                    } else if (keyNum === 3) {
                      // 清空按键按下，此时就把成品滑块数据数组清空
                      this.finishSliderArray = []
                      this.$message({
                        message: `清空成功`,
                        type: 'success',
                        duration: 2500
                      })
                    }
                  } else if (
                    this.specValue === '20' ||
                    this.specValue === '35'
                  ) {
                    /* 工位2或工位5（20或35） */
                    if (keyNum === 0) {
                      // 没有按键按下，此时就单纯在界面上实时显示4个传感器的数字量，一维数组
                      this.showSensorArray = workstation_2
                    } else if (keyNum === 1) {
                      // 标定按键按下，此时就把数据存入到标准滑块数据数组，二维数组
                      if (this.standardSliderArray.length <= 2) {
                        // 按第1~3下
                        this.standardSliderArray.push([
                          workstation_2[0],
                          workstation_2[1],
                          workstation_2[2],
                          workstation_2[3]
                        ])
                      } else if (this.standardSliderArray.length === 3) {
                        // 按第4下
                        this.standardSliderArray.push([
                          workstation_2[0],
                          workstation_2[1],
                          workstation_2[2],
                          workstation_2[3]
                        ])
                        // 标定完成，标定值保存到SessionStorage
                        window.sessionStorage.setItem(
                          'standard_slider_value',
                          JSON.stringify(this.standardSliderArray)
                        )
                        this.$message({
                          message: `标定完成`,
                          type: 'success',
                          duration: 5000
                        })
                      }
                    } else if (keyNum === 2) {
                      // 测量按键按下，此时就把数据存入到成品滑块数据数组，二维数组
                      if (this.finishSliderArray.length <= 2) {
                        // 按第1~3下
                        this.finishSliderArray.push([
                          workstation_2[0],
                          workstation_2[1],
                          workstation_2[2],
                          workstation_2[3]
                        ])
                      } else if (this.finishSliderArray.length === 3) {
                        // 按第4下
                        this.finishSliderArray.push([
                          workstation_2[0],
                          workstation_2[1],
                          workstation_2[2],
                          workstation_2[3]
                        ])
                        // 测量完成，调用save函数，计算结果并调用后端API
                        this.save()
                      }
                    } else if (keyNum === 3) {
                      // 清空按键按下，此时就把成品滑块数据数组清空
                      this.finishSliderArray = []
                      this.$message({
                        message: `清空成功`,
                        type: 'success',
                        duration: 2500
                      })
                    }
                  } else if (
                    this.specValue === '25' ||
                    this.specValue === '45'
                  ) {
                    /* 工位3或工位6（25或45） */
                    if (keyNum === 0) {
                      // 没有按键按下，此时就单纯在界面上实时显示4个传感器的数字量，一维数组
                      this.showSensorArray = workstation_3
                    } else if (keyNum === 1) {
                      // 标定按键按下，此时就把数据存入到标准滑块数据数组，二维数组
                      if (this.standardSliderArray.length <= 2) {
                        // 按第1~3下
                        this.standardSliderArray.push([
                          workstation_3[0],
                          workstation_3[1],
                          workstation_3[2],
                          workstation_3[3]
                        ])
                      } else if (this.standardSliderArray.length === 3) {
                        // 按第4下
                        this.standardSliderArray.push([
                          workstation_3[0],
                          workstation_3[1],
                          workstation_3[2],
                          workstation_3[3]
                        ])
                        // 标定完成，标定值保存到SessionStorage
                        window.sessionStorage.setItem(
                          'standard_slider_value',
                          JSON.stringify(this.standardSliderArray)
                        )
                        this.$message({
                          message: `标定完成`,
                          type: 'success',
                          duration: 5000
                        })
                      }
                    } else if (keyNum === 2) {
                      // 测量按键按下，此时就把数据存入到成品滑块数据数组，二维数组
                      if (this.finishSliderArray.length <= 2) {
                        // 按第1~3下
                        this.finishSliderArray.push([
                          workstation_3[0],
                          workstation_3[1],
                          workstation_3[2],
                          workstation_3[3]
                        ])
                      } else if (this.finishSliderArray.length === 3) {
                        // 按第4下
                        this.finishSliderArray.push([
                          workstation_3[0],
                          workstation_3[1],
                          workstation_3[2],
                          workstation_3[3]
                        ])
                        // 测量完成，调用save函数，计算结果并调用后端API
                        this.save()
                      }
                    } else if (keyNum === 3) {
                      // 清空按键按下，此时就把成品滑块数据数组清空
                      this.finishSliderArray = []
                      this.$message({
                        message: `清空成功`,
                        type: 'success',
                        duration: 2500
                      })
                    }
                  }
                }
              }
            })
          } else {
            this.$alert(
              `请重新连接USB线，然后点击"刷新页面"按钮！`,
              `没有检测到USB连接`,
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '刷新页面',
                callback: () => {
                  this.handleRefresh()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$alert(
            `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '刷新页面',
              callback: () => {
                this.handleRefresh()
              }
            }
          )
        })
    },

    /**
     * @description: 计算结果并调用后端API
     */
    save() {
      this.isSaveing = true // 状态标志

      /* 判断一下二维码是否为空、标定值是否完整 */
      if (this.QRCode !== '') {
        if (this.standardSliderArray.length === 4) {
          /* 第1步：计算结果 */
          const specValue = this.specValue // 规格
          const modelValue = this.modelValue // 型号
          const standard_array = this.standardSliderArray // 标定值，二维数组
          const finish_array = this.finishSliderArray // 测量值，二维数组

          let k2 = 0 // 2号传感器K值
          let k3 = 0 // 3号传感器K值
          let k4 = 0 // 4号传感器K值

          let dg_constant = 0 // 等高常数（μm）
          let toA_constant = 0 // 到A常数（μm）
          let toB_constant = 0 // 到B常数（μm）

          let centerSpacing_min = 0 // 中心距下限（5位压力数字量）
          let centerSpacing_max = 0 // 中心距上限（5位压力数字量）

          let n = 2 // 矩形2，法兰型3
          if (modelValue === 'EA' || modelValue === 'HEA') {
            n = 3
          }

          // 2~4号传感器K值、等高常数、到A常数、到B常数
          const sensor_k = this.sensor_k
          const gg15 = sensor_k[0]
          const gg20 = sensor_k[1]
          const gg25 = sensor_k[2]
          const gg30 = sensor_k[3]
          const gg35 = sensor_k[4]
          const gg45 = sensor_k[5]
          if (specValue === '15') {
            /* K2~K4 */
            k2 = gg15.k2
            k3 = gg15.k3
            k4 = gg15.k4
            switch (modelValue) {
              case 'AA':
                dg_constant = 5
                toA_constant = -12
                toB_constant = 26
                break
              case 'AN':
                dg_constant = 5
                toA_constant = -12
                toB_constant = 26
                break
              case 'DA':
                dg_constant = -4
                toA_constant = 11
                toB_constant = 2
                break
              default:
                dg_constant = 0
                toA_constant = 0
                toB_constant = 0
                break
            }
          } else if (specValue === '20') {
            /* K2~K4 */
            k2 = gg20.k2
            k3 = gg20.k3
            k4 = gg20.k4
            switch (modelValue) {
              case 'AA':
                dg_constant = -1
                toA_constant = 10
                toB_constant = 3
                break
              case 'EA':
                dg_constant = 1
                toA_constant = -11
                toB_constant = 7
                break
              case 'HAA':
                dg_constant = -1
                toA_constant = 10
                toB_constant = 3
                break
              case 'HEA':
                dg_constant = 1
                toA_constant = -11
                toB_constant = 7
                break
              default:
                dg_constant = 0
                toA_constant = 0
                toB_constant = 0
                break
            }
          } else if (specValue === '25') {
            /* K2~K4 */
            k2 = gg25.k2
            k3 = gg25.k3
            k4 = gg25.k4
            switch (modelValue) {
              case 'AA':
                dg_constant = 0
                toA_constant = 14
                toB_constant = 4
                break
              case 'EA':
                dg_constant = 0
                toA_constant = 10
                toB_constant = 0
                break
              case 'AN':
                dg_constant = 2
                toA_constant = 19
                toB_constant = 10
                break
              case 'HAA':
                dg_constant = 0
                toA_constant = 14
                toB_constant = 4
                break
              case 'HEA':
                dg_constant = 0
                toA_constant = 10
                toB_constant = 0
                break
              case 'HAN':
                dg_constant = 2
                toA_constant = 19
                toB_constant = 10
                break
              default:
                dg_constant = 0
                toA_constant = 0
                toB_constant = 0
                break
            }
          } else if (specValue === '30') {
            /* K2~K4 */
            k2 = gg30.k2
            k3 = gg30.k3
            k4 = gg30.k4
            switch (modelValue) {
              case 'AA':
                dg_constant = 4
                toA_constant = 8
                toB_constant = 18
                break
              case 'EA':
                dg_constant = -1
                toA_constant = -6
                toB_constant = -3
                break
              case 'AN':
                dg_constant = -2
                toA_constant = -13
                toB_constant = 6
                break
              case 'HAA':
                dg_constant = 4
                toA_constant = 8
                toB_constant = 18
                break
              case 'HEA':
                dg_constant = -1
                toA_constant = -6
                toB_constant = -3
                break
              case 'HAN':
                dg_constant = -2
                toA_constant = -13
                toB_constant = 6
                break
              default:
                dg_constant = 0
                toA_constant = 0
                toB_constant = 0
                break
            }
          } else if (specValue === '35') {
            /* K2~K4 */
            k2 = gg35.k2
            k3 = gg35.k3
            k4 = gg35.k4
            switch (modelValue) {
              default:
                dg_constant = 0
                toA_constant = 0
                toB_constant = 0
                break
            }
          } else if (specValue === '45') {
            /* K2~K4 */
            k2 = gg45.k2
            k3 = gg45.k3
            k4 = gg45.k4
            switch (modelValue) {
              default:
                dg_constant = 0
                toA_constant = 0
                toB_constant = 0
                break
            }
          }

          /* 中心距的评审结果（0：不合格，1：合格） */
          let centerSpacing_k = 0
          switch (specValue) {
            case '15':
              centerSpacing_k = 0.01
              break
            case '20':
              centerSpacing_k = 0.014
              break
            case '25':
              centerSpacing_k = 0.017
              break
            case '30':
              centerSpacing_k = 0.016
              break
            default:
              centerSpacing_k = 0
              break
          }
          const standard_d = parseFloat(standard_array[0][0] * centerSpacing_k)
          if (specValue === '15') {
            centerSpacing_min = standard_d - 1
            centerSpacing_max = standard_d + 5
          } else if (specValue === '20') {
            if (
              modelValue === 'HAA' ||
              modelValue === 'HEA' ||
              modelValue === 'HAN'
            ) {
              centerSpacing_min = standard_d - 4
              centerSpacing_max = standard_d
            } else {
              centerSpacing_min = standard_d - 3
              centerSpacing_max = standard_d + 2
            }
          } else if (specValue === '25') {
            if (
              modelValue === 'HAA' ||
              modelValue === 'HEA' ||
              modelValue === 'HAN'
            ) {
              centerSpacing_min = standard_d
              centerSpacing_max = standard_d + 4
            } else {
              centerSpacing_min = standard_d - 3
              centerSpacing_max = standard_d + 1
            }
          } else if (specValue === '30') {
            if (
              modelValue === 'HAA' ||
              modelValue === 'HEA' ||
              modelValue === 'HAN'
            ) {
              centerSpacing_min = standard_d - 1
              centerSpacing_max = standard_d + 4
            } else {
              centerSpacing_min = standard_d - 1
              centerSpacing_max = standard_d + 5
            }
          }
          const finish_d = parseFloat(finish_array[0][0] * centerSpacing_k)
          if (finish_d >= centerSpacing_min && finish_d <= centerSpacing_max) {
            this.centerSpacing = 1
          } else {
            this.centerSpacing = 0
          }
          // 给一个中心距的评审不合格弹窗提示
          if (this.centerSpacing === 0) {
            this.$alert(
              '该滑块的中心距评审不合格，请拿去换球，然后拿回来重测一遍！',
              '提示',
              {
                confirmButtonText: '确定',
                type: 'error',
                center: true,
                callback: () => {}
              }
            )
          }

          /* 等高 */
          this.dg =
            (finish_array[2][2] / k3 -
              finish_array[2][3] / k4 -
              (standard_array[2][2] / k3 - standard_array[2][3] / k4)) /
              n +
            dg_constant
          this.dg = parseInt(this.dg.toFixed(0))

          /* 到A */
          this.toA =
            (finish_array[2][2] / k3 +
              finish_array[2][3] / k4 -
              (standard_array[2][2] / k3 + standard_array[2][3] / k4)) /
              2 +
            toA_constant
          this.toA = parseInt(this.toA.toFixed(0))

          /* 到B */
          this.toB =
            finish_array[2][1] / k2 - standard_array[2][1] / k2 + toB_constant
          this.toB = parseInt(this.toB.toFixed(0))

          /* A平行 */
          const aParallelMax = Math.max(
            (finish_array[1][2] / k3 + finish_array[1][3] / k4) / 2,
            (finish_array[2][2] / k3 + finish_array[2][3] / k4) / 2,
            (finish_array[3][2] / k3 + finish_array[3][3] / k4) / 2
          )
          const aParallelMin = Math.min(
            (finish_array[1][2] / k3 + finish_array[1][3] / k4) / 2,
            (finish_array[2][2] / k3 + finish_array[2][3] / k4) / 2,
            (finish_array[3][2] / k3 + finish_array[3][3] / k4) / 2
          )
          this.aParallel = aParallelMax - aParallelMin
          this.aParallel = parseInt(this.aParallel.toFixed(0))

          /* B平行 */
          const bParallelMax = Math.max(
            finish_array[1][1] / k2,
            finish_array[2][1] / k2,
            finish_array[3][1] / k2
          )
          const bParallelMin = Math.min(
            finish_array[1][1] / k2,
            finish_array[2][1] / k2,
            finish_array[3][1] / k2
          )
          this.bParallel = bParallelMax - bParallelMin
          this.bParallel = parseInt(this.bParallel.toFixed(0))

          /* 备注互换性评审：E级互换、N级互换、不发互换、报废 */
          const dg_abs = Math.abs(this.dg) // 等高的绝对值
          const toA_abs = Math.abs(this.toA) // 到A的绝对值
          const toB_abs = Math.abs(this.toB) // 到B的绝对值
          let toA_res = ''
          let toB_res = ''
          let aParallel_res = ''
          let bParallel_res = ''
          // 先判断等高互换性
          if (dg_abs > 50) {
            this.remark = '报废'
          } else if (dg_abs > 5 && dg_abs <= 50) {
            this.remark = '不发互换'
          } else {
            // 判断到A互换性
            if (specValue === '45') {
              if (toA_abs > 100) {
                toA_res = '报废'
              } else if (toA_abs > 25 && toA_abs <= 100) {
                toA_res = '不发互换'
              } else if (toA_abs > 5 && toA_abs <= 25) {
                toA_res = 'N级互换'
              } else {
                toA_res = 'E级互换'
              }
            } else {
              if (toA_abs > 80) {
                toA_res = '报废'
              } else if (toA_abs > 20 && toA_abs <= 80) {
                toA_res = '不发互换'
              } else if (toA_abs > 5 && toA_abs <= 20) {
                toA_res = 'N级互换'
              } else {
                toA_res = 'E级互换'
              }
            }
            // 判断到B互换性
            if (specValue === '45') {
              if (toB_abs > 160) {
                toB_res = '报废'
              } else if (toB_abs > 45 && toB_abs <= 160) {
                toB_res = '不发互换'
              } else if (toB_abs > 15 && toB_abs <= 45) {
                toB_res = 'N级互换'
              } else {
                toB_res = 'E级互换'
              }
            } else {
              if (toB_abs > 150) {
                toB_res = '报废'
              } else if (toB_abs > 40 && toB_abs <= 150) {
                toB_res = '不发互换'
              } else if (toB_abs > 12 && toB_abs <= 40) {
                toB_res = 'N级互换'
              } else {
                toB_res = 'E级互换'
              }
            }
            // 判断A平行互换性
            if (this.aParallel > 40) {
              aParallel_res = '报废'
            } else if (this.aParallel > 10 && this.aParallel <= 40) {
              aParallel_res = 'N级互换'
            } else {
              aParallel_res = 'E级互换'
            }
            // 判断B平行互换性
            if (this.bParallel > 40) {
              bParallel_res = '报废'
            } else if (this.bParallel > 15 && this.bParallel <= 40) {
              bParallel_res = 'N级互换'
            } else {
              bParallel_res = 'E级互换'
            }
            // 最终再判断互换性
            if (
              toA_res === '报废' ||
              toB_res === '报废' ||
              aParallel_res === '报废' ||
              bParallel_res === '报废'
            ) {
              this.remark = '报废'
            } else if (toA_res === '不发互换' || toB_res === '不发互换') {
              this.remark = '不发互换'
            } else if (
              toA_res === 'N级互换' ||
              toB_res === 'N级互换' ||
              aParallel_res === 'N级互换' ||
              bParallel_res === 'N级互换'
            ) {
              this.remark = 'N级互换'
            } else {
              this.remark = 'E级互换'
            }
          }

          /* 精度等级（调用API直接返回结果） */
          const api = `http://${this.ip}/st_t6_sql_001_slide_detection/public/index.php/slideDetection/getTTData`
          this.$axios
            .post(api, {
              xhgg: 'TSGS' + this.specValue + this.modelValue,
              zxj: 0,
              dg: this.dg,
              daoa: this.toA,
              daob: this.toB,
              apx: this.aParallel,
              bpx: this.bParallel
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.accuracyClass = data.result[0].ReviewPrecision

                // console.log(this.QRCode)
                // console.log('TSGS' + this.specValue + this.modelValue)
                // console.log(this.centerSpacing)
                // console.log(this.dg)
                // console.log(this.toA)
                // console.log(this.toB)
                // console.log(this.aParallel)
                // console.log(this.bParallel)
                // console.log(this.accuracyClass)
                // console.log(this.remark)

                /* 第2步：新增数据到后端数据库 */
                const api = `http://${this.ip}/st_t6_sql_001_slide_detection/public/index.php/slideDetection/setSlideDetectionData`
                this.$axios
                  .post(api, {
                    sxm: this.QRCode,
                    xhgg: 'TSGS' + this.specValue + this.modelValue,
                    zxj: this.centerSpacing,
                    dg: this.dg,
                    daoa: this.toA,
                    daob: this.toB,
                    apx: this.aParallel,
                    bpx: this.bParallel,
                    dengji: this.accuracyClass,
                    beizhu: this.remark
                  })
                  .then(res => {
                    const data = res.data
                    if (data.status === 1) {
                      /* 上传成功 */
                      this.$message({
                        message: `数据上传成功。`,
                        type: 'success',
                        duration: 1000
                      })
                      // 成品滑块数据数组清空
                      this.finishSliderArray = []
                      // 二维码编号自增
                      this.QRCodeAdd()
                    } else if (data.status === 0) {
                      /* 上传失败 */
                      this.$alert(
                        `数据上传失败，请点击“刷新页面”按钮，然后重新测量！`,
                        `状态码[${data.status}]`,
                        {
                          type: 'error',
                          showClose: false,
                          center: true,
                          confirmButtonText: '刷新页面',
                          callback: () => {
                            this.handleRefresh()
                          }
                        }
                      )
                    } else if (data.status === -5) {
                      /* 二维码已存在，弹出是否要覆盖旧数据的弹窗 */
                      this.updateTableData()
                    } else {
                      /* 其他错误 */
                      this.$alert(
                        `其他错误，请点击“刷新页面”按钮，然后重新测量！`,
                        `状态码[${data.status}]`,
                        {
                          type: 'error',
                          showClose: false,
                          center: true,
                          confirmButtonText: '刷新页面',
                          callback: () => {
                            this.handleRefresh()
                          }
                        }
                      )
                    }
                  })
                  .catch(err => {
                    this.$alert(`[新增-环节] ${err}`, '断网了', {
                      type: 'error',
                      showClose: false, // 是否显示右上角关闭按钮
                      center: false, // 是否居中布局
                      confirmButtonText: '刷新页面', // 确定按钮的文本内容
                      callback: () => {
                        this.handleRefresh()
                      }
                    })
                  })
                  .finally(() => {})
              } else {
                /* 失败 */
                this.$alert(
                  `[${res.data.message}]，新厂服务器的精度等级API接口出错，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              }
            })
            .finally(() => {
              this.isSaveing = false // 状态标志
              this.getTableData() // 重新获取表格数据（也即刷新表格）
            })
        } else {
          this.$alert(
            `标定值不能为空，请点击"刷新页面"按钮，重新测量标定值！`,
            '警告',
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '刷新页面',
              callback: () => {
                this.handleRefresh()
              }
            }
          )
        }
      } else {
        this.$alert(
          `二维码不能为空，请点击"刷新页面"按钮，重新扫码测量！`,
          '警告',
          {
            type: 'error',
            showClose: false,
            center: true,
            confirmButtonText: '刷新页面',
            callback: () => {
              this.handleRefresh()
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  position: relative;
  @include flex(column, stretch, stretch);

  /* 被测滑块部分 */
  .slider {
    flex: 1;
    @include flex(column, stretch, stretch);
    /* 上侧内容区域 */
    .main {
      height: 10%;
      border-bottom: 2px solid rgb(0, 0, 0);
      @include flex(row, stretch, center);
      /* 规格型号 */
      .gx {
        @include flex(row, stretch, stretch);
        .spec,
        .model {
          @include flex(row, stretch, center);
          margin-right: 20px;
          .text {
            margin-right: 10px;
          }
        }
      }

      /* 二维码 */
      .QRCode {
        @include flex(row, stretch, center);
        .text {
          margin-right: 10px;
        }
        .btn {
          display: none; // 默认隐藏清空二维码的按钮
          margin-left: 20px;
          .btn-item {
            width: 118px;
          }
        }
      }

      /* 按钮组 */
      .btn-bom {
        margin-left: 40px;
        .item {
          margin-right: 20px;
        }
      }
    }

    /* 实时显示4个传感器值 */
    .show {
      height: 10%;
      @include flex(row, center, center);
      .text {
        font-size: 24px;
        font-weight: 700;
      }
      .item {
        margin: 10px 100px;
        border: 2px solid black;
        padding: 5px 10px;
        font-size: 24px;
        color: red;
      }
    }
    /* 显示按键按下时的原始数据 */
    .show-2 {
      font-size: 18px;
    }

    /* 表格区域 */
    .table {
      border-top: 2px solid rgb(0, 0, 0);
      flex: 1;
      margin-bottom: 40px;
    }
  }

  /* 调整传感器位置弹窗 */
  .dialog-box {
    font-size: 30px;
    .item {
      color: red;
      margin-top: 20px;
    }
  }

  /* 开发者页按钮 */
  .btn-developer {
    position: absolute;
    right: 100px;
    bottom: 0;
  }
  /* 打开控制台按钮 */
  .btn-control {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
