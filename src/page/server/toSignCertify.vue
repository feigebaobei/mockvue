<template>
  <div class="toSignCertify">
    <h2>待签发证书</h2>
    <button class="refresh" @click="refresh"> 刷新</button>
    <!-- <el-button>2345</el-button> -->
    <!-- <Checkbox :checked.sync="single">Checkbox</Checkbox> -->
    <!-- <i-table :columns="table.headers" :data="table.tbodyData"></i-table> -->
    <!-- <br> -->
    <!-- 老板不喜欢模块方式显示 -->
    <!-- <div class="pendingTaskItem item" v-for="(item, key, index) in certifyList" :key="index" @click="gotoCertifySign(key)">
      <div class="left">
        <h3>{{getName(item)}}</h3>
        <p class="block">
          <span class="key">种类</span>
          <span class="value">{{getType(item.type)}}</span>
        </p>
        <p class="block">
          <span class="key">父did是否签名</span>
          <span class="value">{{opPdid(item.isPdidCheck)}}</span>
        </p>
        <p class="block">
          <span class="key">人工审核是否签名</span>
          <span class="value">{{opPerson(item)}}</span>
        </p>
      </div>
      <img :src="arrows" alt="" class="arrows">
    </div> -->
    <!-- 老板喜欢表格方式显示 -->
    <div class="tableSimilar">
      <el-table :data="tableData">
        <el-table-column prop="orgName" label="组织名" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="pdid" label="父did是否签名" width="180">
        </el-table-column>
        <el-table-column prop="person" label="人工审核" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="gotoDefautl(scope.row)" type="text" size="smalll">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
import arrows from '@/lib/images/arrows.png'
import {Button, Table, TableColumn} from 'element-ui'
// import tableVue from "@/components/common/table.vue"
// import Checkbox from 'iview/src/components/checkbox'
// import iTable from 'iview/src/components/table'
// import Icon from 'iview/src/components/icon'
// import Icon from 'iview/src/components/icon'

export default {
  props: {},
  data () {
    return {
      arrows: arrows,
      certifyList: {},
      table: {
        headers: [
        ],
        tbodyData: [
            {
                name: '王小明',
                age: 18,
                address: '北京市朝阳区芍药居'
            },
            {
                name: '张小刚',
                age: 25,
                address: '北京市海淀区西二旗'
            },
            {
                name: '李小红',
                age: 30,
                address: '上海市浦东新区世纪大道'
            },
            {
                name: '周小伟',
                age: 26,
                address: '深圳市南山区深南大道'
            }
        ]
      },
      tableData: [
        // {
        //   date: '2345t',
        //   name: 'sdfg',
        //   address: 'werty'
        // }
      ]
    }
  },
  computed: {
  },
  components: {
    // basicvue
    // tableVue,
    // Checkbox,
    // iTable,
    // Icon,
    elButton: Button,
    elTable: Table,
    elTableColumn: TableColumn,
    // Select
  },
  methods: {
    init () {
      this.getData()
    },
    getData () {
      instance({
        url: '/claim/pendingTask',
        method: 'get'
      }).then(response => {
        let data = response.data.data
        // data = {
        //   "0xe8bc70e9b33d19e9a7dc901c7f75a25d08e9ae3c2780b77f3816a46d08061419":{
        //     "msgObj":{
        //       "content":{
        //         "businessLicenseData":{
        //           "applicantDid":"did:ttm:o0fc4810265e45e221b581407ae29298ac98332466e9800998ecf8427ecb62",
        //           "applicantSuperDid":"did:ttm:u011b80743b5fa85ade3a5696eef660b2bae1ba4ba2b84938f26f024cf3fcd",
        //           "claim_sn":"0xe8bc70e9b33d19e9a7dc901c7f75a25d08e9ae3c2780b77f3816a46d08061419",
        //           "createTime":"1598184426000",
        //           "members":["did:ttm:u011b80743b5fa85ade3a5696eef660b2bae1ba4ba2b84938f26f024cf3fcd", "did:ttm:a0e01cb27c8e5160a907b1373f083af3d2eb64fd8ee9800998ecf8427eab11"],
        //           "ocrData":{
        //             "unifiedSocialCreditCode":"91110108551385082Q",
        //             "name":"小米科技有限责任公司",
        //             "type":"有限责任公司(自然人投资或控股)",
        //             "residence":"北京市海淀区西二旗中路33号院6号楼6层006号展示使用",
        //             "legalRepresentative":"雷军",
        //             "registeredCapital":"185000万元",
        //             "dateOfEstablishment":"2010年03月03日",
        //             "operatingPeriod":"2030年03月02日",
        //             "businessScope":"卖手机",
        //             "registrationAuthority":"聚聚",
        //             "businessLicense":"0xf4d0f699d9183c20f628814de97c323ac1824a879a48ffcabbeb80693d3a9444",
        //             "longitude":"",
        //             "latitude":"",
        //             "applicantBankAccountName":"",
        //             "applicantBankName":"",
        //             "applicantBankAccountNumber":"",
        //             "receiveBankName":"北京银行",
        //             "receiveBankAccountName":"北京投肯科技",
        //             "receiveBankAccountNumber":"88888888888888888888",
        //             "verificationMoney":"0.02元"
        //           },
        //           "templateId":"0x40c82a7b3367e346bdcb68021c02a425ba889752636d1d5fd0e0c0cb60efa380"
        //         },
        //         "sign":"0x3245d2400a5ad360430c5588973a1718f211067fabd2d030a9ff1791e00eeb4536cc9283fbe2309a8f7d82d5fe886e5200011091c7e30de1b6c242a69284446e01",
        //         "type":"businessLicenseConfirm"
        //       },
        //       "createTime":"1598184426000",
        //       "messageId":"a0e9c726-1f74-4bfe-88ae-a618ebea34e2",
        //       "method":"confirm",
        //       "sender":"did:ttm:o0fc4810265e45e221b581407ae29298ac98332466e9800998ecf8427ecb62"
        //     },
        //     "isPersonCheck":false,
        //     "isPdidCheck":false,
        //     "auditor":"did:ttm:u0d82e03b9bea525763f3c2c559865c53cb58228c7fafc0dc6285b3643b7d3",
        //     "type":"businessLicenseConfirm"
        //   }
        // }
        let certifyList = []
        for (let [, value] of Object.entries(data)) {
          // certifyList.push(value)
          certifyList.push(value)
        }
        let tbArr = certifyList.reduce((res, cur) => {
          res.push({
            orgName: this.getName(cur),
            type: this.getType(cur.type),
            pdid: this.opPdid(cur.idPdidCheck),
            person: this.opPerson(cur.isPersonCheck),
            claim_sn: cur.msgObj.content.businessLicenseData.claim_sn
          })
          return res
        }, [])
        this.tableData = tbArr
      })
      .catch(error => {
        console.log(error)
        // if (error.response.status === 401) {
        //   this.$router.push({
        //     path: '/login'
        //   })
        // }
      })
    },
    gotoCertifySign (claim_sn) {
      this.$router.push({
        path: '/server/personCheck',
        query: {
          claim_sn: claim_sn
        }
      })
    },
    gotoDefautl (row) {
      // console.log('gotoDefautl 12345ty', row)
      this.gotoCertifySign(row.claim_sn)
    },
    getName (item) {
      // console.log(item)
      let name = ''
      switch (item.type) {
        case 'businessLicenseConfirm':
          name = item.msgObj.content.businessLicenseData.ocrData.name
          break
        default:
          name = ''
          break
      }
      return name
    },
    getType (type) {
      let resType = ''
      switch(type) {
        case 'businessLicenseConfirm':
          resType = '营业执照'
          break
        default:
          resType = ''
          break
      }
      return resType
    },
    opPdid (result) {
      return result ? '已通过' : '未通过'
    },
    opPerson (item) {
      if (item.auditor) {
        return item.isPersonCheck ? '已通过' : '未通过'
      } else {
        return '未处理'
      }
    },
    refresh () {
      this.init()
    }
  },
  created () {},
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .toSignCertify
    display: flex
    flex-wrap: wrap

    h2
      flex-basis: 100%
      flex-shrink: 0

      .refresh
        font-size: 14px

    .item
      display: flex
      align-items: center
      background: #ddd
      flex-basis: 360px
      flex-grow: 0
      margin: 10px
      padding: 10px
      justify-content: space-between
      cursor: pointer

      .left
        flex-basis: 90%
        display: flex
        flex-wrap: wrap

        p
          margin: 4px 0

        .block
          display: flex
          flex-basis: 100%

          .key
            flex-basis: 60%

          .value
            flex-basis: 40%

      arrows
        width: 20px
        height: 20px

    .refresh
      width: 200px
      height: 36px
      margin: 6px 0

    .tableSimilar
      display: flex
      flex-basis: 100%

</style>
