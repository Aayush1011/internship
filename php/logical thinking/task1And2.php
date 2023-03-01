<?php
$file = fopen("input.txt", "r");
$highest = array();
$highestCal = 0;
$sum = 0;
while(! feof($file)) {
    $line = fgets($file);
    if ($line == "\n") {
        array_push($highest, $sum);
        if ($sum > $highestCal) {
            $highestCal = $sum;
        }
        $sum = 0;
        continue;
    }
    $sum += $line;
}
$sum = 0;
print("highest calorie is");
echo "\n";
print($highestCal);
echo "\n";
rsort($highest);
print("top 3 highest calorie is");
echo "\n";
for ($i = 0; $i < 3; $i++) {
    print($highest[$i]);
    echo "\n";
    $sum += $highest[$i];
}
print("sum of top 3 highest calorie is");
echo "\n";
print($sum);
?>
