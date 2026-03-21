const ModuleEarlyIntermediate = {
    description: "Controlling program flow with loops, organizing code with functions, and handling lists of data with arrays. This is where C starts feeling like a real programming language instead of a novelty.",
    
    lessons: [
        {
            id: "loops",
            title: "Loops",
            explanation: "Almost all useful programs repeat operations: process every line in a file, check every element in a list, retry an operation until it succeeds, count down from a timer. Without loops you would have to write out each repetition by hand, which is obviously impossible for any real-scale task. Loops are the mechanism that makes programs scale — the same code that processes one item processes a million items. At the machine level, a loop is just a conditional jump back to an earlier instruction, but at the source level the three C loop types — <code>while</code>, <code>for</code>, and <code>do-while</code> — each express a different pattern of repetition with different clarity for different use cases. Choosing the right one is a readability decision, not a correctness one.",
            sections: [
                {
                    title: "The while Loop",
                    content: "The <code>while</code> loop is the most fundamental: check a condition, execute the body if true, repeat. It is the right choice when you do not know in advance how many iterations you need — 'keep reading input until the user types quit', 'keep retrying until the connection succeeds', 'keep processing until the buffer is empty'. The condition is evaluated <em>before</em> each iteration, so if it is false from the start, the body never runs at all.",
                    points: [
                        "<strong>Syntax</strong>: <code>while (condition) { ... }</code>. As long as the condition is non-zero, the body executes and then the condition is re-evaluated.",
                        "<strong>The loop variable must change</strong>: Every loop must have a way to eventually make the condition false. Something inside the body must move you toward the exit. If nothing changes the condition, you have an infinite loop — the program runs forever consuming CPU and never terminates.",
                        "<strong>Zero-iteration loops are valid</strong>: If the condition is false before the first iteration, the body is skipped entirely. This is correct and expected behaviour — not a bug."
                    ],
                    code: `#include <stdio.h>

int main() {
    // Classic countdown — condition known, but while expresses it clearly
    int countdown = 5;
    while (countdown > 0) {
        printf("%d... ", countdown);
        countdown--;   // moves toward the exit condition
    }
    printf("Launch!\\n");

    // Useful pattern: process until a sentinel value
    int values[] = {4, 7, -1, 3, 9, -1};  // -1 is the "stop" sentinel
    int i = 0;
    int sum = 0;
    while (values[i] != -1) {
        sum += values[i];
        i++;
    }
    printf("Sum before sentinel: %d\\n", sum);  // 4+7 = 11

    // Zero-iteration: condition is false immediately, body never runs
    int n = 0;
    while (n > 0) {
        printf("This never prints.\\n");
        n--;
    }
    printf("Loop skipped entirely (n was already 0).\\n");

    return 0;
}`,
                    output: "5... 4... 3... 2... 1... Launch!\nSum before sentinel: 11\nLoop skipped entirely (n was already 0).",
                    warning: "The most common while-loop bug is forgetting to update the loop variable. If <code>countdown</code> is never decremented, the condition <code>countdown > 0</code> is always true. The program loops forever. On Linux/macOS you can kill it with Ctrl+C; on embedded hardware it will freeze the device."
                },
                {
                    title: "The for Loop",
                    content: "The <code>for</code> loop packages the three things every counted loop needs — where to start, when to stop, how to advance — into a single header line. This makes the loop's entire lifecycle visible at a glance without having to scan the body. It is the right choice when you know exactly how many iterations you need, or when you are iterating over an index-based structure like an array. The three parts of the header are separated by semicolons and each is optional — you can omit any of them, though that usually means a <code>while</code> loop would express your intent more clearly.",
                    points: [
                        "<strong>Initialization</strong>: Executes exactly once before the loop starts. Typically creates and sets the counter variable. <code>int i = 0</code> is conventional — <code>i</code> stands for 'index'.",
                        "<strong>Condition</strong>: Evaluated before every iteration. If false (zero), the loop ends. If the condition is false on the very first check, the body never runs.",
                        "<strong>Update</strong>: Executes after the body, before the condition is re-checked. Typically increments or decrements the counter. <code>i++</code> is the most common, but you can count backward (<code>i--</code>), skip (<code>i += 2</code>), or multiply (<code>i *= 2</code>)."
                    ],
                    code: `#include <stdio.h>

int main() {
    // Standard ascending loop — iterate over indices 0 to 4
    printf("Forward: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // Descending — count backwards
    printf("Backward: ");
    for (int i = 4; i >= 0; i--) {
        printf("%d ", i);
    }
    printf("\\n");

    // Skip by 2 — only even numbers
    printf("Evens: ");
    for (int i = 0; i <= 10; i += 2) {
        printf("%d ", i);
    }
    printf("\\n");

    // Compute sum of 1..100 — a real use case, not just printing
    int sum = 0;
    for (int i = 1; i <= 100; i++) {
        sum += i;
    }
    printf("1 + 2 + ... + 100 = %d\\n", sum);  // 5050

    return 0;
}`,
                    output: "Forward: 0 1 2 3 4 \nBackward: 4 3 2 1 0 \nEvens: 0 2 4 6 8 10 \n1 + 2 + ... + 100 = 5050",
                    tip: "The classic off-by-one errors: <code>i < N</code> gives you exactly N iterations (0 to N-1). <code>i <= N</code> gives you N+1 iterations (0 to N). For array traversal always use <code>i < arraySize</code> — arrays are zero-indexed and <code>arr[arraySize]</code> is one past the end."
                },
                {
                    title: "Do-While Loop",
                    content: "The <code>do-while</code> loop executes the body first, then checks the condition. This guarantees the body runs at least once regardless of the condition's initial value. The practical difference from <code>while</code> is exactly one guaranteed execution — use it when you always need to do something at least once before you can determine whether to continue. Interactive input prompts and retry loops are the clearest real-world use cases.",
                    code: `#include <stdio.h>

int main() {
    int choice;

    // Menu: must display at least once before we know what user wants
    do {
        printf("\\n--- Menu ---\\n");
        printf("1. Say Hello\\n");
        printf("2. Say Goodbye\\n");
        printf("3. Exit\\n");
        printf("Choice: ");
        scanf("%d", &choice);

        if (choice == 1) printf("Hello!\\n");
        if (choice == 2) printf("Goodbye!\\n");
    } while (choice != 3);

    printf("Exiting.\\n");
    return 0;
}`,
                    tip: "The key distinction: <code>while</code> may execute zero times (if the condition starts false). <code>do-while</code> always executes at least once. For most loops, <code>while</code> or <code>for</code> is clearer. Reach for <code>do-while</code> specifically when zero iterations would be wrong."
                },
                {
                    title: "Nested Loops",
                    content: "A loop inside another loop. The inner loop runs to full completion for every single iteration of the outer loop. If the outer runs M times and the inner runs N times, the inner body executes M×N times total. This is the natural structure for anything two-dimensional: grids, matrices, multiplication tables, 2D game boards. The inner loop variable is independent of the outer — each has its own counter.",
                    code: `#include <stdio.h>

int main() {
    // Print a multiplication table
    printf("   ");
    for (int col = 1; col <= 5; col++) printf("%4d", col);
    printf("\\n   ");
    for (int col = 1; col <= 5; col++) printf("----");
    printf("\\n");

    for (int row = 1; row <= 5; row++) {
        printf("%2d|", row);
        for (int col = 1; col <= 5; col++) {
            printf("%4d", row * col);  // inner body: M*N = 25 total executions
        }
        printf("\\n");
    }
    return 0;
}`,
                    output: "      1   2   3   4   5\n   ----------------\n 1|   1   2   3   4   5\n 2|   2   4   6   8  10\n 3|   3   6   9  12  15\n 4|   4   8  12  16  20\n 5|   5  10  15  20  25",
                    tip: "Nested loops have O(n²) complexity — doubling the input size quadruples the work. For small grids this is fine. For large data sets it becomes a performance problem quickly. When you find yourself writing triple-nested loops, stop and think whether there is a smarter algorithm."
                }
            ]
        },
        {
            id: "break-continue",
            title: "Loop Control",
            explanation: "The <code>break</code> and <code>continue</code> statements give you surgical control over loop execution that the condition expression alone cannot provide. The condition governs whether a new iteration starts at all — but once inside the body, you sometimes discover mid-execution that you either need to stop the entire loop or skip the rest of this particular iteration. Without <code>break</code> and <code>continue</code>, the only alternative would be convoluted boolean flags that make the code harder to read. These keywords make intent explicit: 'I am done' (<code>break</code>) or 'this item doesn't qualify, move on' (<code>continue</code>).",
            sections: [
                {
                    title: "break — Exit the Loop Immediately",
                    content: "<code>break</code> jumps execution to the first statement after the loop's closing brace. No remaining iterations run. No condition is re-checked. It is particularly useful for search loops — once you have found what you were looking for, there is no point processing the rest of the data.",
                    code: `#include <stdio.h>

int main() {
    // Linear search: find the first negative number
    int data[] = {3, 7, 2, -5, 8, -1, 4};
    int size = sizeof(data) / sizeof(data[0]);
    int found_at = -1;

    for (int i = 0; i < size; i++) {
        if (data[i] < 0) {
            found_at = i;
            break;   // Stop the moment we find one — no need to continue
        }
    }

    if (found_at >= 0)
        printf("First negative at index %d: %d\\n", found_at, data[found_at]);

    // break in a while loop — same behaviour
    int n = 1;
    while (1) {   // infinite loop — break is the only exit
        if (n * n > 50) break;
        n++;
    }
    printf("Smallest n where n^2 > 50: %d (n^2 = %d)\\n", n, n * n);

    return 0;
}`,
                    output: "First negative at index 3: -5\nSmallest n where n^2 > 50: 8 (n^2 = 64)",
                    tip: "<code>break</code> only exits the innermost loop. In nested loops, a <code>break</code> inside the inner loop exits the inner loop but the outer loop continues. If you need to exit multiple nested loops at once, <code>goto</code> (the one legitimate use case) or a flag variable are the standard approaches."
                },
                {
                    title: "continue — Skip to the Next Iteration",
                    content: "<code>continue</code> skips the rest of the current iteration's body and jumps straight to the update step (in a <code>for</code> loop) or back to the condition check (in a <code>while</code>). The loop itself does not end — only this iteration is cut short. Use it to filter out items that do not qualify for processing, keeping the main logic unindented and readable.",
                    code: `#include <stdio.h>

int main() {
    // Print only numbers divisible by 3, skip the rest
    printf("Multiples of 3 up to 20: ");
    for (int i = 1; i <= 20; i++) {
        if (i % 3 != 0) continue;   // skip non-multiples
        printf("%d ", i);            // only reached for multiples
    }
    printf("\\n");

    // Sum only positive numbers in an array, ignore negatives
    int values[] = {4, -2, 7, -8, 1, 5, -3, 6};
    int n = sizeof(values) / sizeof(values[0]);
    int sum = 0;

    for (int i = 0; i < n; i++) {
        if (values[i] < 0) continue;  // skip negatives
        sum += values[i];
    }
    printf("Sum of positive values: %d\\n", sum);  // 4+7+1+5+6 = 23

    return 0;
}`,
                    output: "Multiples of 3 up to 20: 3 6 9 12 15 18 \nSum of positive values: 23"
                }
            ]
        },
        {
            id: "functions",
            title: "Functions",
            explanation: "A function is a named, reusable block of code that performs a specific, well-defined task. The single most important reason functions exist is that without them, every program would be one long sequence of statements, and any logic you needed to repeat would have to be copied. Copy-pasted code is one of the most expensive problems in software — when the logic has a bug or needs changing, you must find and fix every copy. Functions solve this: write the logic once, call it everywhere, fix it in one place. But functions provide far more than just code reuse. They give you the ability to decompose a complex problem into manageable sub-problems, name those sub-problems meaningfully, and reason about each one independently. A well-named function is documentation — <code>calculateInterest(principal, rate, years)</code> is self-explanatory in a way that 50 lines of arithmetic never is.",
            sections: [
                {
                    title: "Anatomy of a Function",
                    content: "Every function definition has four parts: the return type (what it gives back), the name (how you call it), the parameter list (what it takes in), and the body (what it does). When a function reaches a <code>return</code> statement, execution jumps back to the caller and the returned value is substituted in place of the function call. A function can be called any number of times from anywhere in the program — each call is independent.",
                    points: [
                        "<strong>Return type</strong>: Tells the compiler what type of value this function produces. <code>int</code> for whole numbers, <code>double</code> for decimals, <code>char</code> for a single character, <code>void</code> for 'produces nothing'. The caller uses the return value in an expression or assignment.",
                        "<strong>Name</strong>: Follows the same rules as variable names. Descriptive names are not optional — <code>computeMonthlyPayment</code> is infinitely better than <code>calc</code> when you are reading code six months later.",
                        "<strong>Parameters</strong>: The inputs, declared exactly like local variables. Each call provides its own values for these — they are copies, not the originals (covered in 'Pass by Value' below).",
                        "<strong>Body</strong>: Any statements the function needs. Local variables declared here exist only for the duration of this call and are destroyed when the function returns."
                    ],
                    code: `#include <stdio.h>

// A function that takes two ints and returns their sum
int add(int a, int b) {
    return a + b;
}

// A function that computes the area of a rectangle
double rectangleArea(double width, double height) {
    return width * height;
}

// A function that returns the larger of two values
int max(int x, int y) {
    if (x > y) return x;
    else        return y;
}

int main() {
    printf("3 + 4 = %d\\n", add(3, 4));
    printf("Area: %.2f\\n", rectangleArea(5.0, 3.5));
    printf("Max of 10 and 7: %d\\n", max(10, 7));

    // Return values can be used in expressions directly
    int total = add(10, 20) + add(5, 5);
    printf("Total: %d\\n", total);  // add(10,20)=30, add(5,5)=10, total=40

    return 0;
}`,
                    output: "3 + 4 = 7\nArea: 17.50\nMax of 10 and 7: 10\nTotal: 40"
                },
                {
                    title: "Void Functions — Actions Without Results",
                    content: "Not every function computes and returns a value. Some functions exist purely to perform a side effect — print a report, draw a UI element, write to a file, play a sound. These use the <code>void</code> return type, which tells the compiler and the reader 'this function does something, it does not produce a value you can use in an expression'. Void functions improve readability by naming procedures: instead of 50 lines of printf scattered through main, you have a single call to <code>printInvoice()</code>.",
                    code: `#include <stdio.h>

// Prints a formatted separator line
void printSeparator(int width) {
    for (int i = 0; i < width; i++) printf("-");
    printf("\\n");
}

// Prints a complete receipt — naming this procedure makes main() readable
void printReceipt(char item[], double price, int qty) {
    printSeparator(30);
    printf("Item:     %-15s\\n", item);
    printf("Price:    $%.2f\\n", price);
    printf("Qty:      %d\\n", qty);
    printf("Subtotal: $%.2f\\n", price * qty);
    printSeparator(30);
}

int main() {
    printReceipt("Widget Pro", 9.99, 3);
    printReceipt("Gadget Ultra", 24.50, 1);
    return 0;
}`,
                    output: "------------------------------\nItem:     Widget Pro      \nPrice:    $9.99\nQty:      3\nSubtotal: $29.97\n------------------------------\n------------------------------\nItem:     Gadget Ultra    \nPrice:    $24.50\nQty:      1\nSubtotal: $24.50\n------------------------------",
                    tip: "Void functions can still have an early <code>return;</code> (no value) to exit before reaching the end — useful when a precondition fails: <code>if (qty <= 0) return;</code>. This avoids deeply nested if-else blocks."
                },
                {
                    title: "Pass by Value — and Why It Matters",
                    content: "When you call a function and pass a variable, C copies the value into the function's parameter. The function receives its own independent copy — it cannot reach back and change the original. This isolation is a feature, not a limitation: it means functions cannot accidentally corrupt their caller's data, and you can reason about a function's behaviour by looking at it alone. However, there are cases where you genuinely need a function to modify the caller's variable — for example, a <code>swap</code> function or a function that fills in multiple output values. The answer is pointers, covered in the Low-Level Core module. Understanding pass-by-value first makes the purpose of pointers obvious.",
                    code: `#include <stdio.h>

// This function receives a COPY of x — it cannot change the caller's variable
void tryToDouble(int x) {
    x = x * 2;
    printf("Inside tryToDouble: x = %d\\n", x);  // 20
}

// This function returns the modified value — a clean alternative to mutation
int doubled(int x) {
    return x * 2;
}

int main() {
    int value = 10;

    tryToDouble(value);
    printf("After tryToDouble: value = %d\\n", value);  // Still 10!

    // The clean solution when you need the result: use the return value
    int new_value = doubled(value);
    printf("doubled(10) returned: %d\\n", new_value);   // 20
    printf("original value unchanged: %d\\n", value);   // Still 10

    return 0;
}`,
                    output: "Inside tryToDouble: x = 20\nAfter tryToDouble: value = 10\ndoubled(10) returned: 20\noriginal value unchanged: 10",
                    tip: "Pass-by-value is why functions are safe to compose — <code>max(add(3,4), add(5,2))</code> works without any risk of the inner calls interfering with each other. When you do need a function to modify the caller's variable, the idiom is to pass a pointer to the variable (<code>&value</code>) and have the function dereference it. That pattern is in the Low-Level Core module."
                },
                {
                    title: "Function Prototypes",
                    content: "C reads source files from top to bottom. If you call a function before the compiler has seen its definition, the compiler doesn't know what that function looks like — what it returns, how many arguments it takes, what types those arguments are. A <strong>function prototype</strong> is a forward declaration that tells the compiler 'this function exists and here's its signature' without providing the actual body yet. The body can then appear later in the file — or even in a completely different file.",
                    points: [
                        "<strong>Syntax</strong>: The return type, function name, and parameter types — exactly like the first line of the function definition, but ending with a semicolon instead of opening a body with <code>{</code>.",
                        "<strong>Why it matters</strong>: Without a prototype, calling a function before the compiler has seen it is undefined behavior in older C standards and an error in newer ones. Prototypes fix this cleanly.",
                        "<strong>Header files are just prototypes</strong>: When you write <code>#include &lt;stdio.h&gt;</code>, you're including a file full of prototypes for functions like <code>printf</code> and <code>scanf</code>. The actual implementations live in a compiled library. The prototype is what lets your code compile without seeing that implementation."
                    ],
                    code: `#include <stdio.h>

// PROTOTYPE: Tells the compiler add() exists and what it looks like.
int add(int a, int b);

int main() {
    // Works now even though add() is defined BELOW main.
    int result = add(10, 20);
    printf("Result: %d\\n", result);
    return 0;
}

// DEFINITION: The actual body, appearing after main.
int add(int a, int b) {
    return a + b;
}`,
                    output: "Result: 30",
                    tip: "The common convention is to put all your prototypes at the top of the file (or in a separate <code>.h</code> header file), then define <code>main</code>, then write all your function implementations below it. This way <code>main</code> — the logical entry point — sits near the top of the file where it's easy to find."
                }
            ]
        },
        {
            id: "arrays",
            title: "Arrays",
            explanation: "Consider storing the scores of 100 students. Without arrays, you would need 100 separate variables — <code>score1</code>, <code>score2</code>, ..., <code>score100</code> — and every piece of logic that processes them would need to repeat 100 times. There is no way to loop over them, no way to pass them all to a function conveniently, and adding a 101st student requires editing dozens of lines. Arrays solve this by grouping elements of the same type under one name, addressable by index. An array is not just a syntactic convenience — it is a <em>contiguous block of memory</em> where each element sits immediately after the previous one. This layout is the reason arrays are fast: iterating through them in order accesses memory sequentially, which is exactly what the CPU's cache is optimised for.",
            sections: [
                {
                    title: "Declaration, Initialization, and Access",
                    content: "An array declaration reserves a contiguous block of memory for N elements of the specified type. The elements are addressed by integer indices starting at 0. Accessing an element by index is a constant-time operation — the CPU computes the address as <code>base_address + (index × element_size)</code> in a single instruction. This is why arrays are the fastest data structure for random access.",
                    code: `#include <stdio.h>

int main() {
    // Declare and initialize in one step — size inferred from initializer
    int scores[] = {90, 85, 70, 95, 80};  // 5 elements, indices 0–4

    // Access elements by index (ZERO-BASED — first element is [0])
    printf("First:  %d\\n", scores[0]);   // 90
    printf("Third:  %d\\n", scores[2]);   // 70
    printf("Last:   %d\\n", scores[4]);   // 80 — for 5 elements, last is [4]

    // Modify an element
    scores[2] = 75;
    printf("Third after update: %d\\n", scores[2]);  // 75

    // Partial initialization — unspecified elements become 0
    int data[10] = {1, 2, 3};  // data[3] through data[9] are all 0
    printf("data[0]=%d, data[1]=%d, data[5]=%d\\n", data[0], data[1], data[5]);

    // The sizeof trick: total bytes / bytes-per-element = element count
    int n = sizeof(scores) / sizeof(scores[0]);
    printf("scores has %d elements\\n", n);

    return 0;
}`,
                    output: "First:  90\nThird:  70\nLast:   80\nThird after update: 75\ndata[0]=1, data[1]=2, data[5]=0\nscores has 5 elements",
                    warning: "<strong>Zero-based indexing is not optional.</strong> For an array of size N, valid indices are 0 through N-1. Index N is one past the end. Accessing <code>arr[N]</code> reads memory that does not belong to the array — the program may crash, return garbage, or silently corrupt an adjacent variable. C does not check bounds. Ever."
                },
                {
                    title: "Looping Through Arrays",
                    content: "Loops and arrays are designed for each other. The entire point of grouping data in an array is so a single loop can process all of it — finding the maximum, computing a sum, filtering values — without writing the same logic once per element. The standard pattern: a <code>for</code> loop from 0 to size-1. Compute the size with the <code>sizeof</code> trick in the same scope as the array declaration.",
                    code: `#include <stdio.h>

int main() {
    int scores[] = {88, 72, 95, 61, 79, 84, 67, 91};
    int n = sizeof(scores) / sizeof(scores[0]);  // 8 elements

    // --- Find maximum ---
    int max = scores[0];
    for (int i = 1; i < n; i++) {
        if (scores[i] > max) max = scores[i];
    }
    printf("Highest score: %d\\n", max);

    // --- Compute average ---
    int sum = 0;
    for (int i = 0; i < n; i++) sum += scores[i];
    printf("Average: %.1f\\n", (double)sum / n);

    // --- Count how many passed (>= 70) ---
    int passed = 0;
    for (int i = 0; i < n; i++) {
        if (scores[i] >= 70) passed++;
    }
    printf("Passed: %d / %d\\n", passed, n);

    // --- Print all scores with their index ---
    for (int i = 0; i < n; i++) {
        printf("Student %d: %d %s\\n", i + 1, scores[i],
               scores[i] >= 70 ? "PASS" : "FAIL");
    }
    return 0;
}`,
                    output: "Highest score: 95\nAverage: 79.6\nPassed: 6 / 8\nStudent 1: 88 PASS\nStudent 2: 72 PASS\nStudent 3: 95 PASS\nStudent 4: 61 FAIL\nStudent 5: 79 PASS\nStudent 6: 84 PASS\nStudent 7: 67 FAIL\nStudent 8: 91 PASS"
                },
                {
                    title: "Array Bounds",
                    warning: "C does <strong>NOT</strong> check array boundaries. At all. Ever. If you declare <code>int arr[5]</code> and then access <code>arr[10]</code>, C will not crash immediately, throw an error, or even give you a warning. It will just go to that memory address — which belongs to something else entirely — and read whatever bytes happen to be there. Sometimes you get garbage data. Sometimes you corrupt other variables. Sometimes, in the worst cases, this becomes an exploitable security vulnerability. Always make absolutely sure your loops stop at the correct boundary. Off-by-one errors (going one index too far) are one of the most common bugs in C."
                },
                {
                    title: "Passing Arrays to Functions",
                    content: "When you pass an array to a function, C does <strong>not</strong> copy the entire array. Instead, it passes a pointer to the first element — the array's memory address. This is called <strong>array decay</strong>. Two consequences fall out of this immediately.",
                    points: [
                        "<strong>The function CAN modify the original array</strong>: Because it received the actual memory address, not a copy. Any changes the function makes to elements are changes to the real array in the caller.",
                        "<strong>sizeof breaks inside the function</strong>: Once the array has decayed to a pointer, <code>sizeof(arr)</code> inside the function gives you the size of a pointer (typically 8 bytes on a 64-bit system) — not the size of the array. This is why functions that operate on arrays always take the size as a separate parameter."
                    ],
                    code: `#include <stdio.h>

// 'int arr[]' and 'int *arr' mean the same thing here.
// We MUST pass the size separately.
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

void doubleAll(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2; // Modifies the ORIGINAL array
    }
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    int size = sizeof(nums) / sizeof(nums[0]); // sizeof works correctly HERE
    
    printf("Before: ");
    printArray(nums, size);
    
    doubleAll(nums, size);
    
    printf("After:  ");
    printArray(nums, size);
    
    return 0;
}`,
                    output: "Before: 1 2 3 4 5 \nAfter:  2 4 6 8 10 ",
                    tip: "Always compute <code>sizeof(arr) / sizeof(arr[0])</code> in the same scope where the array is declared, before passing it anywhere. Once it's passed to a function, that calculation will silently give you the wrong answer."
                }
            ]
        },
        {
            id: "strings",
            title: "Strings",
            explanation: "In most modern languages, a string is a built-in object with its own type, automatic memory management, and built-in methods for copying, comparing, and searching. In C, none of that exists. A C string is a plain array of <code>char</code> that ends with a null byte (<code>'\\0'</code>, value zero). That null byte is the only thing that tells <code>printf</code>, <code>strlen</code>, and every other string function where the string ends — there is no length stored anywhere. This design is intentional: it is minimalist, it has zero overhead, and it maps directly to how processors handle character data. Understanding the null terminator is the key to understanding every C string function, every buffer overflow, and why C string handling requires such deliberate attention.",
            sections: [
                {
                    title: "String Declaration and the Null Terminator",
                    content: "When you write a string literal in double quotes, the compiler stores the characters followed by a null byte automatically. <code>\"Hello\"</code> is stored as 6 bytes: <code>'H'</code>, <code>'e'</code>, <code>'l'</code>, <code>'l'</code>, <code>'o'</code>, <code>'\\0'</code>. When you declare a <code>char</code> array to hold a string, you must include space for that extra null byte — <code>char name[6]</code> for a 5-character string. Functions that write strings (like <code>strcpy</code>) write the null terminator for you; functions that read strings (like <code>strlen</code>) stop counting when they hit it.",
                    code: `#include <stdio.h>
#include <string.h>

int main() {
    // The compiler infers size: 5 chars + 1 null = 6 bytes total
    char greeting[] = "Hello";

    printf("String:  %s\\n", greeting);
    printf("Length:  %zu\\n", strlen(greeting));   // 5 — null not counted
    printf("Storage: %zu\\n", sizeof(greeting));   // 6 — null IS counted

    // You can inspect individual characters including the null terminator
    printf("Chars: ");
    for (int i = 0; i <= (int)strlen(greeting); i++) {
        if (greeting[i] == '\\0')
            printf("'\\\\0'");
        else
            printf("'%c' ", greeting[i]);
    }
    printf("\\n");

    // Manually building a string — must place the null terminator yourself
    char manual[6];
    manual[0] = 'W';
    manual[1] = 'o';
    manual[2] = 'r';
    manual[3] = 'l';
    manual[4] = 'd';
    manual[5] = '\\0';  // REQUIRED — without this, printf reads garbage
    printf("Manual: %s\\n", manual);

    return 0;
}`,
                    output: "String:  Hello\nLength:  5\nStorage: 6\nChars: 'H' 'e' 'l' 'l' 'o' '\\0'\nManual: World",
                    warning: "Always allocate at least <code>strlen(s) + 1</code> bytes when copying a string — the +1 is for the null terminator. Forgetting it means the null byte overwrites memory just past your buffer, corrupting whatever lives there. This class of bug is called a buffer overflow and is the source of a significant fraction of real-world security vulnerabilities."
                },
                {
                    title: "String Functions (string.h)",
                    content: "Because strings are arrays, the standard operators do not work on them as you might expect. <code>str1 = str2</code> does not copy a string — it would attempt to assign a pointer, which the compiler rejects for arrays. <code>str1 == str2</code> does not compare string content — it compares memory addresses, almost always producing the wrong answer. All meaningful string operations go through <code>&lt;string.h&gt;</code> functions. The most important ones to memorise and their safe alternatives are below.",
                    code: `#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello";
    char dest[20];   // Buffer must be large enough for the copy + null byte

    // strlen: count characters, NOT including the null terminator
    printf("Length of src: %zu\\n", strlen(src));   // 5

    // strcpy: copy src into dest (dest must have space for src + null byte)
    strcpy(dest, src);
    printf("Copied: %s\\n", dest);   // Hello

    // strcat: append to dest (dest must have space for both strings + null)
    strcat(dest, ", World");
    printf("After strcat: %s\\n", dest);   // Hello, World

    // strcmp: compare contents — returns 0 if equal, <0 or >0 otherwise
    // Never use == to compare strings!
    if (strcmp(src, "Hello") == 0) printf("Match!\\n");
    if (strcmp("apple", "banana") < 0) printf("apple < banana alphabetically\\n");

    // SAFER alternatives: strncpy and strncat limit how many bytes are written
    char safe[10];
    strncpy(safe, "This is a very long string", sizeof(safe) - 1);
    safe[sizeof(safe) - 1] = '\\0';  // strncpy may not null-terminate!
    printf("Safe copy: %s\\n", safe);   // "This is " — truncated, not overflowed

    return 0;
}`,
                    output: "Length of src: 5\nCopied: Hello\nAfter strcat: Hello, World\nMatch!\napple < banana alphabetically\nSafe copy: This is ",
                    warning: "<code>strcpy</code> and <code>strcat</code> will write past the end of the destination buffer if it is not large enough — no error, no warning, just silent memory corruption. Always use <code>strncpy(dest, src, sizeof(dest)-1)</code> and <code>strncat(dest, src, remaining_space)</code> in production code. Even better, use <code>snprintf(dest, sizeof(dest), \"%s\", src)</code> which always null-terminates."
                },
                {
                    title: "Character Classification with ctype.h",
                    content: "Processing text character-by-character is extremely common: validating input (is this all digits?), parsing tokens (is this char a letter or punctuation?), normalising case (convert everything to lowercase). Without <code>&lt;ctype.h&gt;</code> you would write <code>if (c >= 'a' && c <= 'z')</code> — which looks simple but is actually wrong on platforms where letters are not contiguous in the character set. The <code>ctype.h</code> functions are guaranteed correct on every platform and convey intent clearly. Every function takes an <code>int</code> (because <code>char</code> is promoted to <code>int</code> in expressions) and returns a non-zero value for true or 0 for false.",
                    points: [
                        "<code>isalpha(c)</code>: True if c is a letter (A–Z or a–z). Use for word parsing.",
                        "<code>isdigit(c)</code>: True if c is '0'–'9'. Use for numeric validation without calling atoi on garbage.",
                        "<code>isalnum(c)</code>: True if letter or digit. Common for identifier validation.",
                        "<code>isspace(c)</code>: True for space, tab, newline, carriage return, form feed, vertical tab. Use for tokenising input.",
                        "<code>isupper(c)</code> / <code>islower(c)</code>: Case tests.",
                        "<code>toupper(c)</code> / <code>tolower(c)</code>: Return the converted character — they do NOT modify in place. You must write <code>c = toupper(c)</code>. If c has no case conversion (e.g. a digit), the original character is returned unchanged."
                    ],
                    code: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

// Validate that a string looks like a simple identifier: letters, digits, underscores
int isValidIdentifier(const char *s) {
    if (!s || !isalpha((unsigned char)s[0]) && s[0] != '_') return 0;
    for (int i = 1; s[i]; i++) {
        if (!isalnum((unsigned char)s[i]) && s[i] != '_') return 0;
    }
    return 1;
}

// Convert a string to title case in place (first letter of each word uppercased)
void titleCase(char *s) {
    int new_word = 1;
    for (int i = 0; s[i]; i++) {
        if (isspace((unsigned char)s[i])) {
            new_word = 1;
        } else if (new_word) {
            s[i] = (char)toupper((unsigned char)s[i]);
            new_word = 0;
        } else {
            s[i] = (char)tolower((unsigned char)s[i]);
        }
    }
}

int main() {
    // Identifier validation
    const char *names[] = {"myVar", "123bad", "_ok", "has space", "valid_2"};
    for (int i = 0; i < 5; i++) {
        printf("'%s': %s\\n", names[i], isValidIdentifier(names[i]) ? "valid" : "invalid");
    }

    // Title case conversion
    char sentence[] = "the quick BROWN fox";
    titleCase(sentence);
    printf("\\nTitle case: %s\\n", sentence);

    return 0;
}`,
                    output: "'myVar': valid\n'123bad': invalid\n'_ok': valid\n'has space': invalid\n'valid_2': valid\n\nTitle case: The Quick Brown Fox"
                },
                {
                    title: "Reading Strings and User Input",
                    content: "<code>scanf(\"%s\", buf)</code> has two problems that make it dangerous for reading user input: it stops at the first whitespace (so 'John Smith' becomes 'John'), and it has no idea how large <code>buf</code> is — if the user types more characters than the buffer can hold, <code>scanf</code> keeps writing past the end of the array, corrupting memory. <code>fgets</code> solves both problems: it reads an entire line including spaces, and takes a maximum byte count so it can never overflow the buffer.",
                    code: `#include <stdio.h>
#include <string.h>

int main() {
    char name[20];

    // --- WRONG: scanf("%s") — stops at space, no bounds check ---
    // scanf("%s", name);  // "John Smith" → only reads "John"
    //                     // "A very very long name..." → buffer overflow!

    // --- RIGHT: fgets — reads full line, respects buffer size ---
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);

    // fgets includes the trailing newline in the string — strip it
    int len = strlen(name);
    if (len > 0 && name[len - 1] == '\\n') {
        name[len - 1] = '\\0';
    }

    printf("Hello, %s! (length: %zu)\\n", name, strlen(name));

    // --- Reading integers safely ---
    // scanf("%d") is fine for integers: stops at non-digit, no overflow for ints
    int age;
    printf("Enter your age: ");
    if (scanf("%d", &age) == 1) {     // check return value — 1 means success
        printf("Age: %d\\n", age);
    } else {
        printf("Invalid input.\\n");
    }

    return 0;
}`,
                    output: "Enter your name: [John Smith]\nHello, John Smith! (length: 10)\nEnter your age: [25]\nAge: 25",
                    tip: "<code>fgets</code> always appends a null terminator, and it stops either at a newline or when the buffer is full — whichever comes first. The newline itself is included in the buffer when it fits, which is why the stripping step is needed. For robust command-line tools, <code>fgets</code> on <code>stdin</code> is the right tool for reading any line of text."
                }
            ]
        },
        {
            id: "integer-types",
            title: "The Integer Type Family",
            explanation: "So far the curriculum has used <code>int</code> for almost everything integer-shaped. But <code>int</code> is not a universal integer type — it is specifically a 32-bit signed integer on modern systems, which means it has a maximum value of about 2.1 billion and cannot represent negative values when declared <code>unsigned</code>. C's integer family covers a range of sizes and signedness variants because different problems genuinely need different types: a pixel colour component never needs to be larger than 255 or negative, so <code>uint8_t</code> is the right fit. A file offset on a 64-bit system can exceed 4 billion bytes, so <code>int64_t</code> is required. Using the right type is not pedantry — it prevents overflow bugs, communicates intent to the reader, and ensures correct behaviour when code runs on hardware you did not test on.",
            sections: [
                {
                    title: "Size Variants: short, int, long, long long",
                    content: "C's integer types form a size hierarchy. Each level guarantees it's at least as wide as the one before it. The exact sizes are platform-dependent — C only specifies minimums — but on all modern 64-bit systems you'll encounter, the sizes are consistent.",
                    points: [
                        "<code>short</code> (or <code>short int</code>): At least 16 bits. Typically 2 bytes. Range: -32,768 to 32,767. Useful for saving memory in large arrays where values are small.",
                        "<code>int</code>: At least 16 bits, in practice 32 bits (4 bytes) on all modern systems. Range: roughly -2.1 billion to +2.1 billion. This is the default integer type.",
                        "<code>long</code>: At least 32 bits. On 64-bit Linux/macOS it's 8 bytes; on 64-bit Windows it's still 4 bytes. This inconsistency is why <code>long</code> is unreliable for code that must be portable. Use <code>long long</code> or fixed-width types instead.",
                        "<code>long long</code>: At least 64 bits. Guaranteed to be 8 bytes everywhere. Range: roughly -9.2 quintillion to +9.2 quintillion. Use this when you need large integers and portability."
                    ],
                    code: `#include <stdio.h>

int main() {
    short  s = 32767;        // Max short
    int    i = 2147483647;   // Max int (2^31 - 1)
    long   l = 2147483647L;  // L suffix for long literal
    long long ll = 9223372036854775807LL; // Max long long
    
    printf("short:     %d  (%zu bytes)\\n", s,  sizeof(short));
    printf("int:       %d  (%zu bytes)\\n", i,  sizeof(int));
    printf("long:      %ld (%zu bytes)\\n", l,  sizeof(long));
    printf("long long: %lld (%zu bytes)\\n", ll, sizeof(long long));
    
    return 0;
}`,
                    output: "short:     32767  (2 bytes)\nint:       2147483647  (4 bytes)\nlong:      2147483647 (8 bytes)\nlong long: 9223372036854775807 (8 bytes)"
                },
                {
                    title: "Signed vs Unsigned",
                    content: "Every integer type has a signed variant (can hold negative values) and an unsigned variant (only zero and positive). Adding the <code>unsigned</code> keyword before a type shifts the range entirely into non-negative territory — you lose negative numbers but gain the same amount of positive range. The total number of representable values stays the same; it's just the position of the zero point that changes.",
                    points: [
                        "<code>unsigned int</code>: Range 0 to 4,294,967,295 (2^32 - 1). Exactly double the positive range of a signed int.",
                        "<code>unsigned short</code>: Range 0 to 65,535.",
                        "<code>unsigned long long</code>: Range 0 to 18,446,744,073,709,551,615. Use when you need a counter that absolutely cannot go negative and needs a huge range.",
                        "<strong>When to use unsigned</strong>: Array indices, sizes, bit masks, counters that should never be negative. The standard library uses <code>size_t</code> (which is an unsigned type) for sizes and counts for exactly this reason.",
                        "<strong>The danger</strong>: Subtracting from an unsigned variable when the result would be negative wraps around to a huge positive number. <code>0U - 1</code> is 4,294,967,295, not -1. This has caused real security bugs."
                    ],
                    code: `#include <stdio.h>

int main() {
    unsigned int u = 0;
    
    // Unsigned subtraction wrapping
    u = u - 1; // Wraps to maximum value!
    printf("0U - 1 = %u\\n", u); // 4294967295
    
    // Signed overflow (undefined behavior)
    int s = 2147483647; // INT_MAX
    s = s + 1;          // Undefined behavior! Usually wraps to INT_MIN
    printf("INT_MAX + 1 = %d\\n", s); // -2147483648 (but UB!)
    
    // Format specifiers
    unsigned int x = 4000000000U; // Too big for int!
    printf("unsigned: %u\\n",  x); // correct: use %u
    printf("signed:   %d\\n",  x); // wrong:   prints garbage
    
    return 0;
}`,
                    output: "0U - 1 = 4294967295\nINT_MAX + 1 = -2147483648\nunsigned: 4000000000\nsigned:   -294967296",
                    warning: "Never mix signed and unsigned types in comparisons. If you compare a signed <code>int</code> to an <code>unsigned int</code>, C converts the signed value to unsigned first — meaning -1 compares as greater than 4000000000. This is one of the most common sources of subtle bugs in C. Always use consistent signedness, or cast explicitly when you must mix."
                },
                {
                    title: "Format Specifiers for Integer Types",
                    content: "Different integer types need different format specifiers. Using the wrong one is technically undefined behavior and will print garbage on some platforms. The rule is: add <code>l</code> for <code>long</code>, <code>ll</code> for <code>long long</code>, and <code>u</code> for unsigned.",
                    points: [
                        "<code>%d</code> or <code>%i</code>: signed <code>int</code>",
                        "<code>%u</code>: unsigned <code>int</code>",
                        "<code>%ld</code>: signed <code>long</code>",
                        "<code>%lu</code>: unsigned <code>long</code>",
                        "<code>%lld</code>: signed <code>long long</code>",
                        "<code>%llu</code>: unsigned <code>long long</code>",
                        "<code>%hd</code>: signed <code>short</code> (rarely needed — shorts are promoted to int in expressions)",
                        "<code>%zu</code>: <code>size_t</code> — use this for <code>sizeof</code> results and array sizes"
                    ],
                    code: `#include <stdio.h>

int main() {
    short          sh  = 1000;
    int            i   = 2000000;
    long           l   = 3000000000L;
    long long      ll  = 9000000000LL;
    unsigned int   ui  = 4000000000U;
    unsigned long long ull = 18000000000ULL;
    
    printf("short:     %hd\\n", sh);
    printf("int:       %d\\n",  i);
    printf("long:      %ld\\n", l);
    printf("long long: %lld\\n", ll);
    printf("uint:      %u\\n",  ui);
    printf("ull:       %llu\\n", ull);
    printf("sizeof(int): %zu\\n", sizeof(int));
    
    return 0;
}`,
                    output: "short:     1000\nint:       2000000\nlong:      3000000000\nlong long: 9000000000\nuint:      4000000000\null:       18000000000\nsizeof(int): 4"
                }
            ]
        },
        {
            id: "stdint",
            title: "Fixed-Width Integer Types: <stdint.h>",
            explanation: "The built-in integer types (<code>int</code>, <code>long</code>, etc.) have sizes that are platform-dependent. The C standard only guarantees minimums: <code>int</code> is at least 16 bits, <code>long</code> is at least 32 bits. On a 32-bit embedded system, <code>int</code> might be 16 bits. On a 64-bit Linux system, <code>long</code> is 8 bytes, but on 64-bit Windows it is 4 bytes. Code that silently assumes a particular size will produce wrong results, overflow, or corrupt data when compiled on a different target — often in production, not during development. <code>&lt;stdint.h&gt;</code> was introduced in C99 to solve this permanently: it provides types with exact, guaranteed bit-widths on every conforming platform. Whenever the exact size of an integer matters — network packets, binary file formats, hardware registers, cryptography — use these types, not the native ones.",
            sections: [
                {
                    title: "The Problem With Native Types",
                    content: "The C standard specifies minimum sizes, not exact sizes. This seems harmless until you write a program that works perfectly on your laptop and silently produces wrong answers on an embedded board, or a network protocol parser that works correctly on Linux but packs fields to the wrong size on Windows. The same source code, two different binaries, two different behaviours. The specific problem: if you pack a 4-byte integer into a binary packet on a 32-bit Linux system, and then read that packet on a platform where <code>int</code> is 2 bytes, you read garbage. Fixed-width types eliminate this entire class of bug.",
                    points: [
                        "<code>int</code> on a 32-bit desktop: 4 bytes. On some MSP430 microcontrollers: 2 bytes. The same <code>int counter = 100000</code> stores correctly on one and silently overflows on the other.",
                        "<code>long</code>: 8 bytes on 64-bit Linux/macOS, 4 bytes on 64-bit Windows. This inconsistency means <code>long</code> is nearly useless for portable code.",
                        "The safe rule: use native types only where exact size truly does not matter — loop counters, local temporaries. For anything that crosses a boundary (files, networks, hardware, inter-process communication), use fixed-width types."
                    ]
                },
                {
                    title: "The Fixed-Width Types",
                    content: "Include <code>&lt;stdint.h&gt;</code>. The naming convention is: <code>int</code> or <code>uint</code>, number of bits, <code>_t</code>. Signed variants can hold negative numbers; unsigned cannot, but have double the positive range.",
                    points: [
                        "<code>int8_t</code> / <code>uint8_t</code>: Exactly 8 bits. Signed: -128 to 127. Unsigned: 0 to 255. This is one byte.",
                        "<code>int16_t</code> / <code>uint16_t</code>: Exactly 16 bits. Signed: -32,768 to 32,767.",
                        "<code>int32_t</code> / <code>uint32_t</code>: Exactly 32 bits. Signed: ±2.1 billion. This is what most people think <code>int</code> is.",
                        "<code>int64_t</code> / <code>uint64_t</code>: Exactly 64 bits. Signed: ±9.2 quintillion. Use this for large counters, timestamps, file offsets.",
                        "<code>intptr_t</code> / <code>uintptr_t</code>: Wide enough to hold a pointer on the current platform. Useful when you need to store a pointer in an integer."
                    ],
                    code: `#include <stdio.h>
#include <stdint.h>
 
int main() {
    int8_t   a = 127;          // max signed 8-bit
    uint8_t  b = 255;          // max unsigned 8-bit
    int32_t  c = -2147483648;  // min signed 32-bit
    uint64_t d = 18446744073709551615ULL; // max unsigned 64-bit
 
    printf("int8_t  size: %zu bytes, value: %d\\n",  sizeof(a), a);
    printf("uint8_t size: %zu bytes, value: %u\\n",  sizeof(b), b);
    printf("int32_t size: %zu bytes, value: %d\\n",  sizeof(c), c);
    printf("uint64_t size: %zu bytes, value: %llu\\n", sizeof(d), d);
 
    return 0;
}`,
                    output: "int8_t  size: 1 bytes, value: 127\nuint8_t size: 1 bytes, value: 255\nint32_t size: 4 bytes, value: -2147483648\nuint64_t size: 8 bytes, value: 18446744073709551615"
                },
                {
                    title: "The Minimum-Width and Fast Types",
                    content: "<code>&lt;stdint.h&gt;</code> also provides two additional families you'll see in real codebases. The 'least' types give you the smallest type that's at least N bits — useful when you want to save memory but need a guaranteed minimum. The 'fast' types give you the fastest type that's at least N bits — useful for performance-critical counters.",
                    points: [
                        "<code>int_least8_t</code>, <code>int_least16_t</code>, etc: Smallest type with at least that many bits. Guaranteed to exist on every platform.",
                        "<code>int_fast8_t</code>, <code>int_fast16_t</code>, etc: Fastest integer type with at least that many bits. On a 64-bit CPU, <code>int_fast16_t</code> might actually be 64 bits because 64-bit operations are faster than 16-bit ones.",
                        "<code>intmax_t</code> / <code>uintmax_t</code>: The largest integer type the platform supports."
                    ],
                    code: `#include <stdio.h>
#include <stdint.h>
 
// Typical use: a network packet header where field sizes are fixed by the protocol
typedef struct {
    uint8_t  version;    // always 1 byte
    uint8_t  flags;      // always 1 byte
    uint16_t length;     // always 2 bytes
    uint32_t sequence;   // always 4 bytes
} PacketHeader;
 
int main() {
    PacketHeader pkt = {
        .version  = 2,
        .flags    = 0b00000101,
        .length   = 1024,
        .sequence = 99999
    };
 
    printf("Version:  %u\\n",  pkt.version);
    printf("Flags:    0x%02X\\n", pkt.flags);
    printf("Length:   %u\\n",  pkt.length);
    printf("Sequence: %u\\n",  pkt.sequence);
    printf("Header size: %zu bytes\\n", sizeof(PacketHeader));
 
    return 0;
}`,
                    output: "Version:  2\nFlags:    0x05\nLength:   1024\nSequence: 99999\nHeader size: 8 bytes",
                    tip: "For format specifiers with fixed-width types, <code>&lt;inttypes.h&gt;</code> provides portable macros like <code>PRId32</code> and <code>PRIu64</code>. Use them in printf: <code>printf(\"%\" PRId32 \"\\n\", myInt32)</code>. Without these, the correct specifier for <code>int32_t</code> varies by platform — using <code>%d</code> works on most 32-bit systems but is technically wrong on others."
                }
            ]
        },
        {
            id: "random",
            title: "Random Numbers",
            explanation: "Most useful programs need an element of unpredictability — games need different board layouts each run, simulations need varied starting conditions, test suites need random data to cover edge cases. C provides basic pseudo-random generation through <code>&lt;stdlib.h&gt;</code>. Understanding the term <em>pseudo-random</em> is important: the numbers look random and pass basic statistical tests, but they are produced by a completely deterministic mathematical formula. Given the same starting point (the <em>seed</em>), the sequence is identical every run. This determinism is sometimes a bug (a game that plays identically every time) and sometimes a feature (a reproducible test run). The two use cases require different seeding strategies.",
            sections: [
                {
                    title: "rand() and srand()",
                    content: "<code>rand()</code> returns a pseudo-random integer between 0 and <code>RAND_MAX</code> (at least 32767, usually 2^31-1). The key word is pseudo-random: the numbers follow a fixed mathematical sequence. If you start from the same seed, you always get the same sequence — useful for testing, but useless for games if the program always plays the same way. <code>srand(seed)</code> sets the starting point of the sequence.",
                    points: [
                        "<strong><code>rand()</code></strong>: Returns a random int in the range [0, RAND_MAX]. Without seeding, always returns the same sequence starting from a default seed.",
                        "<strong><code>srand(seed)</code></strong>: Seeds the random number generator. Call this once at the start of your program — before any calls to <code>rand()</code>. Calling it multiple times is not useful.",
                        "<strong>Seeding with time</strong>: The standard trick is <code>srand(time(NULL))</code>. <code>time(NULL)</code> returns the current Unix timestamp (seconds since January 1, 1970) — which is different every time you run the program, giving you a different sequence each run. Include <code>&lt;time.h&gt;</code> for <code>time()</code>.",
                        "<strong>Scaling the range</strong>: To get a random number in the range [0, N-1], use <code>rand() % N</code>. To get [min, max], use <code>min + rand() % (max - min + 1)</code>. Be aware that the modulo method has slight bias for large N, but it's fine for most applications."
                    ],
                    code: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    // Seed with current time - different every run
    srand(time(NULL));
    
    // Generate 5 random numbers between 1 and 10
    printf("5 random numbers (1-10):\\n");
    for (int i = 0; i < 5; i++) {
        int r = 1 + rand() % 10; // Range: [1, 10]
        printf("%d ", r);
    }
    printf("\\n");
    
    // Simulate a coin flip: 0 = heads, 1 = tails
    printf("\\nFlipping 10 coins:\\n");
    for (int i = 0; i < 10; i++) {
        if (rand() % 2 == 0) {
            printf("H ");
        } else {
            printf("T ");
        }
    }
    printf("\\n");
    
    // Roll a six-sided die
    printf("\\nRolling a die 5 times:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", 1 + rand() % 6);
    }
    printf("\\n");
    
    return 0;
}`,
                    output: "5 random numbers (1-10):\n7 2 9 4 1 \n\nFlipping 10 coins:\nH T T H H T H T T H \n\nRolling a die 5 times:\n3 6 1 4 2 ",
                    warning: "<code>rand()</code> is not suitable for security or cryptography. It's a simple linear congruential generator — its output is predictable if you know the seed, and its statistical properties are mediocre. For anything security-related (generating passwords, encryption keys, tokens), use your platform's cryptographically secure random source: <code>/dev/urandom</code> on Linux/macOS, or <code>BCryptGenRandom</code> on Windows."
                },
                {
                    title: "Deterministic Seeding for Testing",
                    content: "The fact that <code>rand()</code> is deterministic is actually useful for testing and debugging. If you seed with a fixed value instead of <code>time(NULL)</code>, your program produces the exact same 'random' sequence every run — which means you can reproduce bugs that involve random numbers, and you can write tests with predictable expected outputs.",
                    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Fixed seed: same output EVERY run
    srand(42);
    
    printf("With seed 42:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", rand() % 100);
    }
    printf("\\n");
    
    // Reset to same seed - get same sequence again
    srand(42);
    printf("Same seed again:\\n");
    for (int i = 0; i < 5; i++) {
        printf("%d ", rand() % 100);
    }
    printf("\\n");
    
    return 0;
}`,
                    output: "With seed 42:\n68 49 9 24 85 \nSame seed again:\n68 49 9 24 85 ",
                    tip: "A common pattern: accept an optional seed from the command line or an environment variable. If the seed is provided, use it (for reproducible testing). If not, seed with <code>time(NULL)</code> (for production). This gives you the best of both worlds."
                }
            ]
        }
    ],
    
    quiz: [
        {
            question: "Which loop runs at least once?",
            options: ["for", "while", "do-while", "foreach"],
            answer: 2,
            explanation: "do-while checks its condition after executing the body, so it always runs at least once. while and for check first."
        },
        {
            question: "What does `break` do?",
            options: ["Pauses the loop", "Skips iteration", "Exits the loop", "Breaks the compiler"],
            answer: 2,
            explanation: "break immediately exits the innermost loop or switch statement. continue skips to the next iteration; break exits entirely."
        },
        {
            question: "What is the index of the last element in array `arr[10]`?",
            options: ["10", "9", "0", "11"],
            answer: 1,
            explanation: "Array indices start at 0, so for arr[10] the valid indices are 0 through 9. Index 9 is the last element."
        },
        {
            question: "What ends a C string?",
            options: ["Space", "Period", "Null Terminator (\\0)", "Newline"],
            answer: 2,
            explanation: "C strings end with a null terminator '\\0' (value 0). Functions like strlen count characters until they find this byte."
        },
        {
            question: "How are arguments passed to functions in C?",
            options: ["By Reference", "By Value (Copy)", "By Pointer", "By Name"],
            answer: 1,
            explanation: "C passes all function arguments by value — a copy is made. To modify the original, you must pass a pointer."
        },
        {
            question: "Which function copies a string?",
            options: ["strcat", "strcmp", "strcpy", "strlen"],
            answer: 2,
            explanation: "strcpy copies a string into a destination buffer. strcat appends. strcmp compares. strlen measures."
        },
        {
            question: "What is the output of: for(int i=0; i<3; i++) printf(\"*\");",
            options: ["***", "****", "**", "Error"],
            answer: 0,
            explanation: "The loop runs for i=0,1,2, printing '0\\n1\\n2\\n'. The condition i<3 means it stops before i=3."
        },
        {
            question: "If you access array index out of bounds, what happens?",
            options: ["Compiler Error", "Runtime Error", "Undefined Behavior", "Returns 0"],
            answer: 2,
            explanation: "Out-of-bounds array access is undefined behavior — anything can happen. The program may crash, silently corrupt data, or appear to work. C does not perform bounds checking."
        },
        {
            question: "What does isdigit('5') return?",
            options: ["0", "5", "Non-zero (true)", "'5'"],
            answer: 2,
            explanation: "isdigit returns non-zero (true) for characters '0' through '9', and 0 for anything else. It tests the ASCII value of the character."
        },
        {
            question: "What function must you call before rand() to get different results each run?",
            options: ["seed()", "srand(time(NULL))", "init_rand()", "randomize()"],
            answer: 1,
            explanation: "srand seeds the random number generator. Without seeding with time(NULL), rand() produces the same sequence every run because it starts with the same default seed."
        },
        {
            question: "Which type holds the largest integer values?",
            options: ["int", "long", "long long", "short"],
            answer: 2,
            explanation: "long long is 64 bits and holds values up to ~9.2 × 10^18. unsigned long long is even larger. int is only 32 bits."
        }
    ],
    
    practice: [
        {
            title: "Sum of Array",
            difficulty: "easy",
            problem: "Create an array of 5 integers. Use a loop to calculate the sum of all elements.",
            solution: `#include <stdio.h>

int main() {
    int arr[] = {5, 10, 15, 20, 25};
    int sum = 0;
    int size = sizeof(arr) / sizeof(arr[0]);
    
    for(int i=0; i<size; i++) {
        sum += arr[i];
    }
    printf("Sum: %d\\n", sum);
    return 0;
}`
        },
        {
            title: "Factorial Function",
            difficulty: "medium",
            problem: "Write a function `factorial(int n)` that returns n! (e.g., 5! = 5*4*3*2*1). Use long long as the return type to avoid overflow.",
            solution: `#include <stdio.h>

long long factorial(int n) {
    long long result = 1;
    for(int i=1; i<=n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    printf("5! = %lld\\n", factorial(5));
    printf("20! = %lld\\n", factorial(20));
    return 0;
}`
        },
        {
            title: "String Length Manual",
            difficulty: "medium",
            problem: "Write a program that counts the length of a string WITHOUT using strlen().",
            solution: `#include <stdio.h>

int main() {
    char str[] = "Hello World";
    int count = 0;
    
    while (str[count] != '\\0') {
        count++;
    }
    
    printf("Length: %d\\n", count);
    return 0;
}`
        },
        {
            title: "Multiplication Table",
            difficulty: "hard",
            problem: "Use nested loops to print a 5x5 multiplication table.",
            solution: `#include <stdio.h>

int main() {
    for(int i=1; i<=5; i++) {
        for(int j=1; j<=5; j++) {
            printf("%4d", i*j);
        }
        printf("\\n");
    }
    return 0;
}`
        },
        {
            title: "Password Validator",
            difficulty: "hard",
            problem: "Write a function that checks if a password string is valid: at least 8 characters, contains at least one uppercase letter, one lowercase letter, and one digit. Use <ctype.h> functions.",
            hint: "Loop through each character checking isdigit(), isupper(), islower(). Use bool flags.",
            solution: `#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>
#include <string.h>

bool isValidPassword(const char *password) {
    int len = strlen(password);
    if (len < 8) return false;
    
    bool hasUpper = false, hasLower = false, hasDigit = false;
    
    for (int i = 0; i < len; i++) {
        if (isupper(password[i])) hasUpper = true;
        if (islower(password[i])) hasLower = true;
        if (isdigit(password[i])) hasDigit = true;
    }
    
    return hasUpper && hasLower && hasDigit;
}

int main() {
    const char *tests[] = {"weak", "NoDigits!", "n0upper!", "Str0ng!"};
    for (int i = 0; i < 4; i++) {
        printf("'%s': %s\\n", tests[i],
               isValidPassword(tests[i]) ? "VALID" : "INVALID");
    }
    return 0;
}`
        }
    ],
    
    exam: [
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    for (int i = 0; i < 4; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
            options: ["0 1 2 3 4", "0 1 2 3", "1 2 3 4", "0 1 2"],
            answer: 1,
            explanation: "The loop runs while i < 4, so i takes values 0, 1, 2, 3. When i reaches 4, the condition fails and the loop exits. Four numbers printed."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    int i = 0;
    while (i < 5) {
        if (i == 3) break;
        printf("%d ", i);
        i++;
    }
    printf("\\n");
    return 0;
}`,
            options: ["0 1 2 3 4", "0 1 2 3", "0 1 2", "1 2 3"],
            answer: 2,
            explanation: "When i reaches 3, break exits the loop immediately without printing 3. Only 0, 1, 2 are printed."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int square(int n) {
    return n * n;
}
int main(void) {
    printf("%d\\n", square(4));
    printf("%d\\n", square(3) + square(4));
    return 0;
}`,
            options: ["16 then 25", "16 then 7", "4 then 7", "16 then 24"],
            answer: 0,
            explanation: "square(4) = 16. square(3) + square(4) = 9 + 16 = 25. Functions are evaluated before their results are used in expressions."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    printf("%d\\n", arr[2]);
    printf("%d\\n", arr[0] + arr[4]);
    return 0;
}`,
            options: ["30 then 60", "20 then 50", "30 then 50", "20 then 60"],
            answer: 0,
            explanation: "arr[2] is the third element: 30. arr[0] + arr[4] = 10 + 50 = 60."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char s[] = "Hello";
    printf("%zu\\n", strlen(s));
    printf("%zu\\n", sizeof(s));
    return 0;
}`,
            options: ["5 then 5", "5 then 6", "6 then 6", "5 then 4"],
            answer: 1,
            explanation: "strlen counts characters excluding the null terminator: 5. sizeof includes the null terminator: 6. This is a key distinction."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
void addOne(int x) {
    x = x + 1;
}
int main(void) {
    int n = 5;
    addOne(n);
    printf("%d\\n", n);
    return 0;
}`,
            options: ["6", "5", "0", "Undefined"],
            answer: 1,
            explanation: "C passes arguments by value — addOne receives a copy of n. Modifying x inside the function does not affect n in main. n stays 5."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    for (int i = 0; i < 5; i++) {
        if (i % 2 == 0) continue;
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
            options: ["0 2 4", "1 3", "0 1 2 3 4", "1 2 3 4"],
            answer: 1,
            explanation: "continue skips the rest of the loop body when i is even. Only odd values (1, 3) reach printf."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}`,
            options: ["10", "15", "14", "5"],
            answer: 1,
            explanation: "Adds 1+2+3+4+5 = 15. The loop runs for i = 1, 2, 3, 4, 5 (inclusive because i <= 5)."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char a[] = "cat";
    char b[] = "dog";
    printf("%d\\n", strcmp(a, b));
    printf("%d\\n", strcmp(a, a));
    return 0;
}`,
            options: ["0 then 0", "negative then 0", "positive then 0", "negative then 1"],
            answer: 1,
            explanation: "strcmp compares lexicographically. 'c' < 'd' so strcmp(\"cat\", \"dog\") is negative. Comparing equal strings returns 0."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    int x = 10;
    do {
        printf("%d ", x);
        x -= 3;
    } while (x > 0);
    printf("\\n");
    return 0;
}`,
            options: ["10 7 4 1", "10 7 4", "7 4 1", "10 7 4 1 -2"],
            answer: 0,
            explanation: "do-while executes before checking the condition. Starts at 10: prints 10 (x=7), 7 (x=4), 4 (x=1), 1 (x=-2). Now x > 0 is false, loop ends."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main(void) {
    int arr[3] = {0};
    arr[1] = 42;
    for (int i = 0; i < 3; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
            options: ["0 0 0", "42 0 0", "0 42 0", "42 42 42"],
            answer: 2,
            explanation: "int arr[3] = {0} initializes all elements to zero. Then arr[1] is set to 42. Loop prints each: 0, 42, 0."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
int main(void) {
    printf("%d\\n", factorial(5));
    return 0;
}`,
            options: ["120", "24", "60", "5"],
            answer: 0,
            explanation: "5! = 5*4*3*2*1 = 120. The recursion unwinds: factorial(5) = 5*factorial(4) = 5*24 = 120."
        }
    ]
};

window.ModuleEarlyIntermediate = ModuleEarlyIntermediate;