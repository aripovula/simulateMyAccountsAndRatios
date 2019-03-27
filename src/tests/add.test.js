const add = (a, b) => a + b;
const greet = (t) => `Hello ${t}`;

test('should add numbers - ', () => {
    const res = add(2, 3);
    // if (res !== 5) {
    //     throw new Error(`Expected 5. Result - ${res}`);
    // }
    expect(res).toBe(5);
});

test('should greet - ', () => {
    const res = greet('Bek');
    expect(res).toBe('Hello Bek');
});