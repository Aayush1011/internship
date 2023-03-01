<?php
    class Student {
       private $name;
       private $address;
       
       function __construct($name, $address) {
         $this->name = $name;
         $this->address = $address;
       }

       function getName() {
        return $this->name;
       }
       function getAddress() {
        return $this->address;
       }
    }

    class Mathematics extends Student {
        private $algebraMarks;
        private $calculusMarks;
        private $geometryMarks;

        function __construct($studentName, $studentAddress, $algebraMarks, $calculusMarks, $geometryMarks) {
            parent::__construct($studentName, $studentAddress);
            $this->algebraMarks = $algebraMarks;
            $this->calculusMarks = $calculusMarks;
            $this->geometryMarks = $geometryMarks;
        }

        function getAlgebraMarks() {
            return $this->algebraMarks;
        }
        function getCalculusMarks() {
            return $this->CalculusMarks;
        }
        function getGeometryMarks() {
            return $this->geometryMarks;
        }
        function getMatheMaticsAverage() {
            return ($this->algebraMarks + $this->geometryMarks + $this->geometryMarks) / 3;
        }
    }
    class ComputerScience extends Student {
        private $JAVAMarks;
        private $CPPMarks;
        private $pythonMarks;
        private $computerScience;

        function __construct($name, $address, $JAVAMarks, $CPPMarks, $pythonMarks) {
            parent::__construct($name, $address);
            $this->JAVAMarks = $JAVAMarks;
            $this->CPPMarks = $CPPMarks;
            $this->pythonMarks = $pythonMarks;
        }

        function getJAVAMarks() {
            return $this->JAVAMarks;
        }
        function getCPPMarks() {
            return $this->CPPMarks;
        }
        function getPythonMarks() {
            return $this->pythonMarks;
        }
        function getComputerScienceAverage() {
            return ($this->JAVAMarks + $this->CPPMarks + $this->pythonMarks) / 3;
             
        }
    }

    function main() {
        $mathematicsStudent = new Mathematics("aayush", "bhaktapur", 101, 80, 75);
        echo $mathematicsStudent->getMatheMaticsAverage(). "\n";
        $computerScienceStudent = new ComputerScience("aakash", "kathmandu", 55, 45, 30);
        echo $computerScienceStudent->getComputerScienceAverage(). "\n";
    }

    main();
?>