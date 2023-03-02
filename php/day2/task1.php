<?php
    //encapsulation is supported in php. It can be achieved by
    //using class.
    class FootballPlayer {
        private $name;
        private $shootingStats;
        private $passingStats;
        private $dribblingStats;

        function __construct($name, $shootingStats, $passingStats, $dribblingStats) {
            $this->name = $name;
            $this->shootingStats = $shootingStats;
            $this->passingStats = $passingStats;
            $this->dribblingStats = $dribblingStats;
        }

        function calculatePlayerValuation() {
            $calculation = (0.33 * $this->shootingStats + 0.33 * $this->passingStats + 0.33 * $this->dribblingStats) * 5000000;
            return "$this->name is worth $$calculation.";
        }
    }

    function main() {
        $messi = new FootballPlayer("Lionel Messi", 89, 90, 94);
        echo $messi->calculatePlayerValuation();
    }

    main();
 ?>