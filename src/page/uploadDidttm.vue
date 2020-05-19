<template>
  <div class="updataPvData">
    <!-- 上传文件 -->
    <form action="#" method="post" enctype="multipart/form-data" class="form">
      <div class="item">
        <label class="label" for="didttm">dit文件</label>
        <input type="file" name="didttm" id="didttm" @change="changeDidttm">
      </div>
      <button class="button" @click="submitDidttm">提交</button>
    </form>
    <!-- 解密 -->
    <form action="#" method="post" v-if="didttmUploaded" class="form">
      <div class="item">
        <label class="label" for="idpwd">身份密码</label>
        <input type="password" name="idpwd" id="idpwd" v-model="idpwd" class="input">
      </div>
      <button class="button" @click="decryptDidttm">解密并查看明文</button>
    </form>
    <!-- 查看明文 -->
    <section class="mtBox" v-if="decrypt.finish">
      <section v-if="decrypt.result">
        <p>解密成功</p>
        <!-- <button class="button" @click="reqDidttmMt">查看明文</button> -->
        <p>{{this.didttmmt}}</p>
      </section>
      <section v-else>
        <p>解密失败</p>
      </section>
    </section>
    <!-- 更新pvdata -->
    <button class="button" v-if="decrypt.result" @click="updataPvData">更新pvdata</button>
  </div>
</template>

<script>
// import { basicvue } from '@/components/oasiscare'
import instance from '@/lib/axiosInstance'
// import qs from 'qs'
export default {
  props: {},
  data () {
    return {
      didttm: '', // didttm文件
      didttmUploaded: false, // didttm文件是否上传成功
      idpwd: '',
      didttmmt: '',
      decrypt: {
        result: false, // 是否解密成功
        finish: false, // 是否完成解密
      }
    }
  },
  computed: {
  },
  components: {
    // basicvue
  },
  methods: {
    // init () {
    //   this.getData()
    // },
    // getData () {}
    submitDidttm (event) {
      event.preventDefault()
      instance({
        url: '/private/didttm',
        method: 'post',
        data: this.getFormData(),
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log('res', res)
        if (res.data.result) {
          this.didttmUploaded = true
        } else {
          this.didttmUploaded = false
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    getFormData() {
      let formData = new FormData()
      formData.append('didttm', this.didttm)
      return formData
    },
    changeDidttm (event) {
      let file = event.target.files[0]
      this.didttm = file
      // console.log(file)
      return file
    },
    decryptDidttm (event) {
      event.preventDefault()
      instance({
        url: '/private/decrypt',
        method: 'post',
        data: {
          idpwd: this.idpwd,
          did: this.didttm.name.match(/^\w*(?=\.ttm$)/)[0]
        }
      }).then(res => {
        // console.log('res', res)
        this.didttmmt = JSON.parse(res.data.data)
        this.decrypt.finish = true
        this.decrypt.result = true
      }).catch(err => {
        console.log('err', err)
        this.decrypt.finish = true
      })
    },
    // reqDidttmMt () {}
    updataPvData () {
      instance({
        url: '/private/pvdata',
        method: 'post',
        data: {
          did: this.didttm.name.match(/^\w*(?=\.ttm$)/)[0]
        }
      })
    }
  },
  created () {},
  mounted () {
    // this.init()
  }
}
</script>

<style lang="stylus" scoped>

  .button
    width: 100%
    height: 34px
    padding: 8px
    border-radius: 8px
    margin-bottom: 15px

  .updataPvData
    width: 420px
    margin: 30px 0

    .form
      .item
        display: flex;
        align-items: center
        margin-bottom: 10px

      .label
        margin-right: 6px

      .input
        flex-grow: 1
        height: 28px

</style>
