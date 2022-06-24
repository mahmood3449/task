<template>
<div>
  <div class="login">
    <form class="login__mobail" v-on:submit.prevent.enter="sendMobaile">
      <div class="login__mobail-label">
      <label>شماره موبایل</label>
      </div>
      <div class="login__mobail-input">
      <input type="text" v-model="formData.Mobile">
      </div>
      <div class="login__mobail-submit">
        <input type="submit" value="ارسال">
      </div>
    </form>
    <form class="login__password" v-on:submit.prevent.enter="logIn">
      <div class="login__password-label">
      <label>رمز ورود</label>
      </div>
      <div class="login__password-input">
      <input type="text" v-model="formData.Code">
      </div>
      <div class="login__password-submit">
        <input type="submit" value="ورود">
      </div>
    </form>
    <div class="loading" v-if="loading">
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="150px" height="150px" viewBox="0 0 150 150" enable-background="new 0 0 150 150" xml:space="preserve">
<g opacity="0.95">
	<circle fill="#EF4136" cx="56.752" cy="57.16" r="12"/>
	<circle fill="#2B3990" cx="93.703" cy="57.16" r="12"/>
	<circle fill="#92278F" cx="93.703" cy="93.764" r="12"/>
	<circle fill="#1C75BC" cx="56.926" cy="93.764" r="12"/>
	<animateTransform attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from="0 75 75"
                    to="360 75 75"
                    dur="2s"
                    repeatCount="indefinite"/>
</g>
</svg>
    </div>
    <div class="message" v-show="message" ref="message"></div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'App',
  data(){
    return{
      formData:{
        "Mobile": null, 
        "Code": null
      } , 
      loading: false,
      message: false , 
    }
  } ,
  methods:{
    sendMobaile(e){
        this.loading = true;
        let formData = new FormData();
          formData.append("Input", JSON.stringify({
              "FN": "AuthCode_Request",
              "Mobile": this.formData.Mobile,
          }));
          axios({
              url: 'http://ef.bostanchi.com/api/api/API',
              data: formData,
              processData: false,
              contentType: false,
              method: "POST",
              timeout:30000,
          }).then((response) => {
            this.loading = false;
              if (response.data.Result === 0) {
                  this.message = true; 
                  this.$refs.message.textContent = response.data.Message;
                  setTimeout(() => {
                    this.message = false;
                  }, 3000);
              } 
              else{
                throw new Error(response.data.Message);
              }
          })
          .catch((error)=>{
            this.message = true;
                this.$refs.message.textContent = error;
                setTimeout(() => {
                  this.message = false;
                }, 3000);
          })
    },
    logIn(){
      let formData = new FormData();
        formData.append("Input", JSON.stringify({
            "FN": "AuthToken_Request",
            "Mobile": this.formData.Mobile,
            "Code": this.formData.Code
        }));
        axios({
            url: 'http://ef.bostanchi.com/api/api/API',
            data: formData,
            processData: false,
            contentType: false,
            method: "POST",
            timeout:30000,
        }).then((response) => {
          console.log(response);
            if (response.data.Result === 0) {
                this.message = true;
                this.$refs.message.textContent = response.data.Message;
                this.formData.Mobail = null;
                this.formData.Code = null;
                setTimeout(() => {
                  this.message = false;
                  this.$router.push({name: 'ShowData'});
                }, 3000);
            } 
            else{
              throw new Error(response.data.Message);
            }
        })
            .catch((error)=>{
              this.message = true;
              this.$refs.message.textContent = error;
              setTimeout(() => {
                this.message = false;
              }, 3000);
            })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  color: white;
  width: 30%;
  height: 50vh;
  background: rgba(0, 0, 0, 0.274);
  margin: 100px auto;
  border-radius: 5px;
  &__mobail{
    &-label{
      width: 95%;
      text-align: right;
      padding: 0.3rem;
    }
    &-input{
      width: 99%;
      text-align: center;
      padding: 0.5rem;
      input{
        width: 90%;
        padding: 0.5rem 0;
        border: none;
        text-align: right;
        border-bottom: 1px solid red;
        background: transparent;
        outline: none;
        color: white;
      }
    }
    &-submit{
      text-align: center;
      input{
        padding: 0.5rem 2rem;
        border-radius: 5px;
        color: white;
        border: none;
        transition: 1s;
        background: rgb(255, 96, 96);
        &:hover{
          color: black;
        }
      }
    }
  }
  &__password{
    &-label{
      width: 95%;
      text-align: right;
    }
    &-input{
      width: 99%;
      text-align: center;
      padding: 0.5rem;
      input{
        width: 90%;
        padding: 0.5rem 0;
        border: none;
        text-align: right;
        border-bottom: 1px solid red;
        background: transparent;
        outline: none;
        color: white;
      }
    }
    &-submit{
      text-align: center;
      input{
        padding: 0.5rem 2rem;
        border-radius: 5px;
        color: white;
        border: none;
        transition: 1s;
        background: rgb(255, 96, 96);
        &:hover{
          color: black;
        }
      }
    }
  }
  .loading{
    text-align: center;
  }
  .message , .login{
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.274);
  }
}
</style>