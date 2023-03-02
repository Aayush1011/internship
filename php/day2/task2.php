<?php
        class DecreaseByOne {
            private $value;
        
            public function __construct($value) {
                $this->value = $value;
            }
        
            public function __invoke() {
                $this->value--;
            }
        
            public function getValue() {
                return $this->value;
            }
        }
        $number = new DecreaseByOne(5);
        
        $number();
        
        echo $number->getValue();
        
      
?>