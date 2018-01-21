var rect = {
    perimeter: (x, y) => (2*(x+y)),
    area: (x,y) => (x*y)
};

function solveRect(l,b){
    console.log("Solving for rectangle with l = " + l + " and b = " + b);

    if(l <= 0 || b <= 0){
        console.log("Restangle dimensions should be greater than zero: l = " + l + ", and b = " + b);
    }
    else{
        console.log("the area of the retangle is " + rect.area(l,b));
        console.log("the perimeter of the rectangle id " + rect.perimeter(l,b));
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(7,8);