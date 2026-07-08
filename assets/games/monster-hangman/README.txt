ОБЕД МОНСТРА / MONSTER'S LUNCH
==============================

Что в папке:
  index.html          - игра (английская версия)
  words.js            - СЛОВА английской версии (редактируйте в Блокноте)
  words-ru.js         - СЛОВА русской версии
  index-ru.html       - игра (русская версия)
  download-images.ps1 - скрипт, который скачает три картинки

Как запустить:
  1. Распакуйте всё в C:\Users\home\Documents\monster hangman
  2. Правый клик по download-images.ps1 -> "Выполнить с помощью PowerShell"
     (появятся monster-open.png, monster-closed.png, hero.png)
  3. Откройте index.html двойным кликом - игра работает.

Если PowerShell-скрипт не запускается, скачайте картинки вручную -
ссылки внутри download-images.ps1 - и сохраните их с именами:
  monster-open.png, monster-closed.png, hero.png

Настройка (в index.html, блок SETTINGS в начале <script>):
  WORDS - список слов и подсказок
  STEPS - последнее число = куда падает человечек (больше = ниже)

На сайт:
  <iframe src="monster-hangman/index.html" width="440" height="880"
          style="border:none"></iframe>

Слова:
  Откройте words.js (или words-ru.js) в Блокноте.
  Одна строка = одно слово в формате:  СЛОВО | подсказка
  Подсказку можно не писать. Сохраните файл и обновите страницу.
