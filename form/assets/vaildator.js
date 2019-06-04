(function(global,factory,plug){
    factory.call(global,window.jQuery,plug)
}(typeof window === 'undefined' ? this : this , function($,plug){
    var __DEFAULT__ = {
        raise:'change',
        error:'* value is failed'
    }
    var __RULES__ = {
        'require':function(){
            return this.val() !== ''&&this.val();
        },
        'email':function(){
            return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(this.val());
        },
        'number':function(){
            return true;
        },
        'tell':function(){
            return true;
        },
        'regex':function(){
            return new RegExp($(this).data('regex')).test($(this).val())
        },
    }
    $.fn[plug] = function(opt){
        if(this.is('form')){
            var fileds = this.find('input,textarea,select').not('[type=submit],[type=button],[type=rest]');
            var that = $.extend(this,__DEFAULT__,opt);
            fileds.on(that.raise,function(){
                var $filed = $(this);
                var $error = $filed.siblings('.error');
                $error.removeClass('has-error')
                var result = false;
                var msg = null;
                $.each(__RULES__,function(rulesName,active){
                    if($filed.data(rulesName)){
                        result = active.call($filed);
                        if(!result){
                            msg = $filed.data(rulesName+'-message') || that.error;
                            $error.addClass('has-error').html(msg)
                            return false;
                        }else{
                            $error.removeClass('has-error')
                        }
                    }
                })
            })
        }else{
            throw new Error('目标元素不是表单')
        }
    }
},'vaildator'))
