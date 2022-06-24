<template>
<div>
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
<div class="showdata" v-else>
    <div class="showdata__header">
      <div class="showdata__header-search">
        <form v-on:submit.prevent.enter="search">
          <input type="text" class="input" v-model.trim="serachUser">
          <input type="submit" value="جستجو" class="btn">
        </form>
      </div>
    </div>
    <div class="showdata__table">
      <table>
        <tr>
          <th>ثبت کننده</th>
          <th>تاریخ ثبت</th>
          <th>قیمت</th>
          <th>منطقه</th>
          <th>منبع</th>
          <th>دوره</th>
          <th>کالا</th>
          <th>دسته</th>
          <th>ID</th>
        </tr>
        <tr v-for="(data , index) in arrayData" :key="index">
          <td>{{ data.CreateBy.Firstname }} {{data.CreateBy.Lastname}}</td>
          <td>{{ convert(data.CreateOn) }}</td>
          <td>{{ data.Price }}</td>
          <td>{{ data.Zone.Name }}</td>
          <td>{{ data.Source.Name }}</td>
          <td>{{ data.Period.Name }}</td>
          <td>{{ data.Article.Title }}</td>
          <td>{{ data.Article.Parent.Name }}</td>
          <td>{{ data.ID }}</td>
        </tr>
      </table>
    </div>
    <div class="showdata__pagination">
      <button class="prev" v-on:click="prev">قبلی</button><div>{{ paginationNumber }}</div><button class="next" v-on:click="next">بعدی</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'jalali-moment'
export default {
    name: 'ShowData',
    data(){
      return{
        arrayData: null , 
        paginationNumber: 1 , 
        loading: false , 
        serachUser: null
      }
    } ,
    methods:{
      sendData(paginationNumber = 1 , searchUser = ""){
        this.loading = true;
        let formData = new FormData();
        formData.append("Input", JSON.stringify({
          "FN": "Admin_Price_List",
          "CatID":0,"ArticleID":0,"PeriodID":"","SourceID":"","ZoneID":"","Search":searchUser,"Page":paginationNumber,"Take":10,
          "Token": '888DD77579142325A6CE86B43D92764C29BB8D17ADAA306463',
        }));
        axios({
            url: 'http://app.imeanalysis.com/api/api/API',
            data: formData,
            processData: false,
            contentType: false,
            method: "POST",
            timeout:30000,
        }).then((response) => {
          this.loading = false;
          console.log(response.data.Price_List);
            if (response.data.Result === 0) {
              this.arrayData = response.data.Price_List;
            } 
        })
      } ,
      convert(data){
       return moment(data, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
      } ,
      next(){
        this.paginationNumber++;
        this.arrayData.length = 0;
        this.sendData(this.paginationNumber);
      } ,
      prev(){
        this.paginationNumber--;
        if(this.paginationNumber <= 0){
          this.paginationNumber = 1;
          return;
        }
        this.arrayData.length = 0;
        this.sendData(this.paginationNumber);
      },
      search(e){
        console.log(e);
        this.arrayData.length = 0;
        this.sendData(this.paginationNumber , this.serachUser);
      }
    } ,
    mounted(){
      this.sendData();
    }
}
</script>

<style lang="scss" scoped>
.showdata{
  width: 90%;
  height: auto;
  margin: auto;
  background: rgba(192, 192, 192, 0.274);
  border-radius: 5px;
  &__header{
    width: 90%;
    margin: auto;
    height: 10vh;
     &-search{
      width: 100%;
      
      padding: 1rem 0;
      text-align: center;
      .input{
        width: 40%;
        padding: 0.5rem;
        border: none;
        outline: none;
        text-align: right;
      }
      .btn{
        padding: 0.5rem 2rem;
        background: rgb(255, 96, 96);
        transition: 1s;
        border: none;
        color: white;
        &:hover{
        color: black;
       }
      }
     }
  }
  &__table{
    width: 90%;
    height: auto;
    margin: 30px auto;
    table {
    border-collapse: collapse;
    width: 100%;
    th, td {
  text-align: left;
  padding: 8px;
  text-align: center;
}
tr:nth-child(even){
  background-color: #e6e6e6
  }
  tr:nth-child(odd){
  background-color: #F8F5FE
  }
th {
  background-color: #e5a3ff;
}
}
  }
  &__pagination{
    width: 90%;
    margin: auto;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    div{
      width: 5%;
      height: 4vh;
      background: transparent;
      text-align: center;
      padding: 0.3rem;
      font-weight: bolder;
      color: white;
      border: 1px solid rgb(255, 96, 96);;
    }
    .prev{
      background: rgb(255, 96, 96);
      transition: 1s;
      border: none;
      padding: 0.5rem 1rem;
      color: white;
       border: 1px solid gray;
       &:hover{
        color: black;
       }
    }
    .next{
      background: rgb(255, 96, 96);
      transition: 1s;
      border: none;
      padding: 0.5rem 1rem;
      color: white;
       border: 1px solid gray;
       &:hover{
        color: black;
       }
    }
  }
}
.loading{
  text-align: center;
}
</style>