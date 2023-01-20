import { Cell, find_path_dijkstra, number_to_object_grid } from "./dijkstra"

function last_element(array: Array<any>){
    return array[array.length - 1];
}


/**
 * funkcja zwraca krotki [kierunek skrętu, komórka]
 * na podstawie drogi złożonej z komórek
 * od startowej do końcowej
 * @param path
 * @param current_facing
 * @returns
 */
function turn_coordinates(path: Array<Cell>, current_facing = 'north'): Array<[string, Cell]>{
    let turns: Array<[string, Cell]> = [];
    let last_cell = last_element(path);
    let current_cell = path[0];
    let current_index = 0;
    let next_facing = "north";
    while (last_cell != current_cell){
        let [x2, y2] = path[current_index + 1].coordinates;
        let [x1, y1] = current_cell.coordinates;
        let difference = [x2-x1, y2-y1];
        if (difference[0] == 0){ // czy nie ma zmiany w X
            if (difference[1] == 1){ // czy kolejna jest niżej
                next_facing = "south";
            }
            else { // skoro nie jest niżej to jest wyżej
                next_facing = "north";
            }
        }
        else { // zmiana w X
            if (difference[0] == -1){ // zmiana w lewo
                next_facing = "west";
            }
            else { // zmiana w prawo
                next_facing = "east";
            }
        }

        if (next_facing != current_facing){ // dołączanie skrętu jeśli zmienia się orientacja
            turns.push([next_facing, current_cell]);
            current_facing = next_facing;
        }
        current_index += 1; // przejście na kolejną komórke w ścieżce
        current_cell = path[current_index];
    }
    return turns;
}


// function doors_between_points()

function direction_vector(direction: string): [number, number]{
    if (direction == "north"){
        return [0, -1]
    }
    if (direction == "south"){
        return [0, 1]
    }
    if (direction == "east"){
        return [1, 0]
    }
    if (direction == "west"){
        return [-1, 0]
    }
    else{
        return [0,0]
    }
}

function is_passing_nearby_door(grid: Array<Array<Cell>>, og_cell: Cell, direction: string): boolean{
    let checked_amount = 0;
    let wall_found = false;
    let [current_column, current_row] = og_cell.coordinates;
    let change_vector = direction_vector(direction);
    while (checked_amount < 6 && !wall_found){
        current_column += change_vector[0];
        current_row += change_vector[1];
        let current_cell = grid[current_row][current_column];
        if (current_cell.room_text != undefined){
            return true;
        }
        else if (!current_cell.is_walkable){
            wall_found = true;
        }
    }
    return false;
}




/**
 *
 *
 *
 * @param grid
 * @param path
 * @param previous_turn
 * @param next_turn
 * @returns how many doors the user has to pass before the turn
 */
function doors_passed_in_slice(grid: Array<Array<Cell>>, path: Array<Cell>, previous_turn: [string, Cell], next_turn: [string, Cell]): number {
    let [next_facing, next_cell] = next_turn;
    let previous_cell = previous_turn[1];
    let start_index = path.indexOf(previous_cell);
    let end_index = path.indexOf(next_cell);
    let doors_passed = 0;
    if (start_index == 0) {
        for (let origin_cell of path.slice(start_index, end_index)){ // go through every cell in path in range <last turn; next turn)
            if (is_passing_nearby_door(grid, origin_cell, next_facing)){
                doors_passed += 1;        }
        }
    }
    else {
        for (let origin_cell of path.slice(start_index+1, end_index)){ // go through every cell in path in range (last turn; next turn)
            if (is_passing_nearby_door(grid, origin_cell, next_facing)){
                doors_passed += 1;        }
    }
    }
    return doors_passed;
}

/**
 * Takes the whole grid and path, and returns
 * an array of [doors passed, turn direction, turn cell]
 * meaning the number of doors passed between the last turn and the next
 * If the next turn is north, it will measure the doors north of the cells
 * along the path between the two turns, etc.
 *
 *
 *
 *
 *
 *
 * @param grid
 * @param path
 * @returns [doors passed before turn, turn direction, turn cell]
 */
function path_door_counter(grid: Array<Array<Cell>>, path: Array<Cell>): Array<[number, string]> {
    let turns = turn_coordinates(path);
    if (turns.length == 0){
        return [];
    }
    let turns_with_doors: Array<[number, string]> = []
    let previous_turn: [string, Cell] = ["north", path[0]];
    for (let next_turn of turns){
        let [next_facing, next_cell] = next_turn;
        let doors_passed = doors_passed_in_slice(grid, path, previous_turn, next_turn)
        turns_with_doors.push([doors_passed, next_facing])
        previous_turn = next_turn;
        }
    return turns_with_doors;
}


let number_grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 2, 2, 2, 1, 0, 0, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 0, 1, 1, 2, 2, 1, 1, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let grid = number_to_object_grid(number_grid);
let path = find_path_dijkstra([8,9], [2,1], grid);
let turns_with_doors = path_door_counter(grid, path)
export { number_to_object_grid, find_path_dijkstra, path_door_counter };
// let turns = turn_coordinates(path);
// console.log(turns);

