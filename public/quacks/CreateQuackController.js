angular.module("quacker").controller ("CreateQuackController", ["quacks", 
function (quacks) {
    var self = this,
        dialog = null,
        image_box_clone = null,
        max_num_images = 3;
    
    this.openModal = function() {
        if (!dialog) {
            dialog = $(".modal").dialog ({
                autoOpen : false,
                buttons : {
                    "Create a quack" : self.addQuack,
                    "Cancel" : self.closeModal
                }
            });
            
            dialog.dialog("open");
        } else {
            dialog.dialog ("open");
        }
        
        if (!image_box_clone) {
            image_box_clone = $(".image-container").first().clone(true,true);
        }
    
        $(".quack-message").focus();
        self.showingModal = true;
    };
    
    this.closeModal = function() {
        dialog.dialog("close");
        self.showingModal = false;
        
        // Reset form
        $(".quack-message").val("");
        $(".quack-image").each(function(idx, val) {
            val.value = ""; 
        });
    };
    
    this.addQuack = function() {
        var message = $(".quack-message").val(),
            images = [];
        
        $(".quack-image").each (function(idx, el) {
            var obj = {
                src : el.value.trim(),
                caption : $(".quack-caption")[idx].value.trim()
            };
            
            // Don't add empty images
            if (obj.src.length) {
                images.push (obj);
            }
        });
        
        
        quacks.addQuack(message, images);
//        quacks.fetchQuacks();
        self.closeModal();
        
    };
    
    this.addImageBox = function() {
        if ($(".image-container").length < max_num_images) {
            $(".image-container").last().after(image_box_clone.clone(true,true));   
        }
    };
}]);

