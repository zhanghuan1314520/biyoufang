Component({
    properties: {
        visibility: {
            type: Boolean,
            value: !1,
            observer: function(i) {
                this.transferAnimatin(i);
            }
        }
    },
    data: {
        _visibility: !1,
        slideInOrOut: null
    },
    created: function() {
        this.animation = wx.createAnimation({
            timingFunction: "ease",
            duration: 400
        });
    },
    methods: {
        noTouch: function() {},
        transferAnimatin: function(i) {
            var t = this;
            i ? this.setData({
                _visibility: i,
                slideInOrOut: null
            }, function() {
                t.slideAnimation();
            }) : this.slideAnimation(function() {
                setTimeout(function() {
                    t.setData({
                        _visibility: i,
                        slideInOrOut: null
                    });
                }, 300);
            });
        },
        slideAnimation: function(i) {
            var t = this;
            i ? (this.animation.bottom("-480rpx").step(), i()) : this.animation.bottom(0).step(), 
            setTimeout(function() {
                t.setData({
                    slideInOrOut: t.animation.export()
                });
            }, 100);
        },
        toggleVisibility: function(i) {
            this.triggerEvent("closeModal");
        }
    }
});