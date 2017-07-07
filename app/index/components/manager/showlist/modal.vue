<template>
	<div class="modal fade" :id="identity" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<slot name="title"></slot>
				</div>
				<div class="modal-body">
					<slot name="content"></slot>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<slot name="button"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data (){
			return {

			};
		},
		props:['identity']
	};
</script>