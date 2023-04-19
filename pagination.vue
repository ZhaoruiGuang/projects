<template>
	<div class="pagination_box" v-if="totalPage >= 1">
			<ul id="pagination">
			    <li class="bothEnds firstPage" v-on:click="switchPage(1)">首页</li>
			    <li class="move moveBefore" v-on:click="switchPage(currentPage-1)">上一页</li>
			
			    <template v-if="totalPage >= 8">
			        <template v-if="currentPage > 4">
			            <li v-on:click="switchPage(1)">
			                1
			            </li>
			            <li class="point">
			                ...
			            </li>
			        </template>
			        <template v-for="n in 5">
			            <li v-if="currentPage == 4" v-bind:class="{'active': n===currentPage}" v-on:click="switchPage(n)">
			                {{n}}
			            </li>
			        </template>
			        <template v-for="n in 4">
			            <template v-if="currentPage < 4">
			                <li v-bind:class="{'active': n===currentPage}" v-on:click="switchPage(n)">
			                    {{n}}
			                </li>
			            </template>
			            <template v-if="currentPage > 4">
			                <li v-if="currentPage+4 <= totalPage" v-bind:class="{'active': n+currentPage-2===currentPage}" v-on:click="switchPage(n+currentPage-2)">
			                    {{n+currentPage-2}}
			                </li>
			            </template>
			        </template>
			        <template v-for="n in 4">
			            <li v-if="currentPage+3 > totalPage" v-bind:class="{'active': totalPage-4+n===currentPage}" v-on:click="switchPage(totalPage-4+n)">
			                {{totalPage-4+n}}
			            </li>
			        </template>
			        <template v-for="n in 5">
			            <li v-if="currentPage+3 == totalPage" v-bind:class="{'active': totalPage-5+n===currentPage}" v-on:click="switchPage(totalPage-5+n)">
			                {{totalPage-5+n}}
			            </li>
					
			        </template>
					<template v-if="currentPage+3 < totalPage">
					    <li class="point">
					        ...
					    </li>
					    <li v-bind:class="{'active': totalPage===currentPage}" v-on:click="switchPage(totalPage)">
					        {{totalPage}}
					    </li>
					</template>
			    </template>
			    <template v-if="totalPage < 8">
			        <template v-for="n in totalPage">
			            <li v-bind:class="{'active': n===currentPage}" v-on:click="switchPage(n)">
			                {{n}}
			            </li>
			        </template>
			    </template>
			
			    <li class="move moveAfter" v-on:click="switchPage(currentPage+1)">下一页</li>
			    <li class="bothEnds lastPage" v-on:click="switchPage(totalPage)">尾页</li>
				<div style="clear: both;"></div>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			totalPage:{
				type:Number,
				required:true,
				default:1
			},
			currentPage:{
				type:Number,
				required:true,
				default:1
			},
			activeColor:{
				type:String,
				default:'#38CA7B'
			}
		},
		mounted(){
			this.setItemStyle();
		},
		methods:{
			setItemStyle(){
				let doms = document.querySelectorAll('#pagination li');
				for (let i = 0; i < doms.length; i++) {
				    doms[i].style.color = '#222';
				    doms[i].style.backgroundColor = '#fff';
				    doms[i].style.border = '1px solid #eee';
				};
				let activeDom = document.querySelector('#pagination .active');
				activeDom.style.color = '#fff';
				activeDom.style.backgroundColor = this.activeColor;
				activeDom.style.border = '1px solid ' + this.activeColor;
			},
			switchPage: function (currentPage) {
			    if (this.currentPage === currentPage || currentPage < 1 || currentPage > this.totalPage) {
			        return;
			    };
				this.$emit('switchPage',currentPage);
				this.$nextTick(()=>{
					this.setItemStyle();
				});
			},
		},
	}
</script>

<style>
	.pagination_box{
		text-align: center;
		margin: 30px auto;
	}
	#pagination{
	    display:inline-block;
	    width:auto;
	    margin:0 auto;
	}
	#pagination li{
		border:1px solid #eee;
		font-size:12px;
		color:#222;
		width:32px;
		height:29px;
		line-height:28px;
		text-align:center;
		display: inline-block;
		border-radius:2px;
		margin-right:5px;
		cursor: pointer;
		float: left;
		user-select: none;
	}
	#pagination .bothEnds{
		width:38px;
	}
	#pagination .move{
		width:50px;
	}
	#pagination .active{
		/* background-color: #38CA7B;
		border:1px solid #38CA7B; */
		color:#fff;
		border:none;
	}
	#pagination .point{
	   border:none;  
	   width: 24px;
	}
</style>
