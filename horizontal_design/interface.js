var interfaceClass = {
	current : {},
	jumpLeft : function ($current, $dest, track) {
		if ($dest.length == 0 || $current.is('.moveLeft') || $current.is('.moveRight'))
			return;
		$current.addClass('visible');
		setTimeout(function () {
			$current.addClass('moveLeft');
		}, 1);
		$dest.removeClass('left right').addClass('visible right');
		setTimeout(function () {
			$dest.addClass('current');
		}, 1);
		if(_.isUndefined(track)) {
			var item = this.getCurrentItem();
			historyClass.saveNode(item);
		}
	},
	jumpRight : function ($current, $dest, track) {
		if ($dest.length == 0 || $current.is('.moveLeft') || $current.is('.moveRight'))
			return;
		$current.addClass('visible');
		setTimeout(function () {
			$current.addClass('moveRight');
		}, 1);
		$dest.removeClass('left right').addClass('visible left');
		setTimeout(function () {
			$dest.addClass('current');
		}, 1);
		if(_.isUndefined(track)) {
			var item = this.getCurrentItem();
			historyClass.saveNode(item);
		}
	},
	itemMoveLeft : function () {
		var $current = $('.layers .level.current .item.current');
		this.jumpLeft($current, $current.next())
	},
	itemMoveRight : function () {
		var $current = $('.layers .level.current .item.current');
		this.jumpRight($current, $current.prev(), false)
	},
	levelMoveLeft : function () {
		var $current = $('.layers .level.current');
		this.jumpLeft($current, $current.next())
	},
	levelMoveRight : function () {
		var $current = $('.layers .level.current');
		this.jumpRight($current, $current.prev(), false)
	},
	loadLayer : function (level, data, callback) {
		$('.layers .level' + level).html(data);
	},
	resetLayer : function (level) {
		$('.layers .level' + level).html('');
	},
	/*gotoLayer : function (level) {
		var $current = $('.layers .level.current');
		var $dest = $('.layers .level' + level);
		if ($dest.length == 0)
			return;
		this.jumpLeft($current, $dest)
	},*/
	gotoItem : function (level, item, jumpDirection, track) {
		var $current = $('.layers .level.current');
		var $dest = $('.layers .level' + level);
		if(!$current.is('.layers .level' + level)) {
			var $item = $dest.find('.item').eq(item);
			$dest.find('.item').removeClass('current visible');
			if ($item.length == 0)
				return;
			$item.addClass('current visible');
		} else {
			$current = $('.layers .level.current .item.current');
			$dest = $dest.find('.item').eq(item);
		}
		jumpDirection = (jumpDirection == 'right') ? this.jumpRight : this.jumpLeft;
		jumpDirection($current, $dest, track);
	},
	getCurrentItem : function() {
		var item = $('.layers .level.current .item').index( $('.layers .level.current .item.current') );
		var level = $('.layers .level').index( $('.layers .level.current') );
		return {"item":item, "level" : level+1}
	},
	setItemLevelEvent : function () {
		$('.layers .level, .layers .level .item').bind('webkitTransitionEnd', function () {
			if ($(this).is('.moveLeft') || $(this).is('.moveRight')) {
				$(this).removeClass('left right moveLeft moveRight current visible');
				return;
			}
			if ($(this).is('.current')) {
				$(this).removeClass('left right');
				return;
			}
		})
		
		var me = this;
		$('.layers .level .item').bind('swipeone',function(event, obj){
			var direction = me.getSwipeDirection(obj);
			if(direction=='') return;
			switch(direction){
				case 'left':
					me.itemMoveLeft();
				break;
				case 'right':
					//me.itemMoveRight();
					historyClass.goBack();
				break;
			}
		});
		
	},
	getSwipeDirection : function(_oDetails) {
			var deltaX = _oDetails.delta[0].lastX;
			var deltaY = _oDetails.delta[0].lastY;
			var hor = ver = '';
			if (deltaX > 0) { // right
				hor = 'right';
				ver = (deltaY > 0) ? 'down' : 'up';
				if (Math.abs(deltaY) < deltaX * 0.3) {
					ver = '';
				} else if (Math.abs(deltaY) >= deltaX * 2.2) {
					hor = '';
				}
			} else { // left
				hor = 'left';
				ver = (deltaY > 0) ? 'down' : 'up';
				if (Math.abs(deltaY) < Math.abs(deltaX) * 0.3) {
					ver = '';
				} else if (Math.abs(deltaY) > Math.abs(deltaX) * 2.2) {
					hor = '';
				}
			}
			return hor;
	}
}

var historyClass = {
	first : {"item":0, "level" : 1},
	map : [],
	goBack : function (callback) {
		if(this.map.length==0) return false;
		var $dest = _.last(this.map);
		interfaceClass.gotoItem($dest.level, $dest.item, 'right', false);
		this.removeNode();
		return true;
	},
	saveNode : function(item){
		this.map.push(item)
		return item;
	},
	removeNode : function(){
		this.map.pop();
		return true;
	}
}

$(function () {
	interfaceClass.setItemLevelEvent();
});
