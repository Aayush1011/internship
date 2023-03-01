<?php 
    class Dictionary {
        private $dictionaryFile;
        private $fileArray = array();

        function __construct(...$word) {
            $this->fileArray = explode("\n", file_get_contents("day1/dictionaryFile.txt"));
            $this->fileArray = array_filter($this->fileArray);
            $this->dictionaryFile = fopen("day1/dictionaryFile.txt", "wa+");
            $this->manageDictionary($word);
        }

        function addToDictionary($word) {
               $this->fileArray = array_merge($this->fileArray, $word);
        }

        function sortDictionary() {
            sort($this->fileArray);
        }

        function writeToFile() {
            foreach ($this->fileArray as $value) {
                fwrite($this->dictionaryFile, $value.PHP_EOL);
            }
        }

        function __sleep() {
            return ['fileArray'];
        }

        function __destruct() {
            if ($this->dictionaryFile) {
                fclose($this->dictionaryFile);
            }
        }

        function __wakeup() {
            $this->dictionaryFile = fopen("day1/dictionaryFile.txt", "wa+");
        }

        function manageDictionary($word) {
            $this->addToDictionary($word);
            $this->sortDictionary();
            $this->writeToFile();
        }
    }

    function main() {
        $newDictionary = new Dictionary('apple', 'anise');
    }

    main();
?>