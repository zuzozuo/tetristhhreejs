//STAŁE GLOBALNE

var MAP_HEIGHT = 22, //wysokość w kafelkach
    MAP_WIDTH = 10, //szerokość w kafelkach
    STATE_GET_RANDOM_BLOCK = 1, //stan losowania klocka
    STATE_FALLING_BLOCK = 2, //stan upadania klocka
    STATE_FALLEN_BLOCK = 3, //stan upadłego klocka (klocek spadł i nie może sie ruszyć)
    STATE_GAME_OVER = 4, //stan końca gry (nie ma miejsca na klocki)
    FALLING_SPEED = 8, //prędkość spadania
    KEY_RIGHT = 39, //klawisze
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_DOWN = 40