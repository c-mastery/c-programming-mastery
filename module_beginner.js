const ModuleBeginner = {
    description: "The absolute foundation: understanding how C programs work, storing data, and interacting with the user. Yes, you have to start here. No shortcuts.",
    
    lessons: [
        {
            id: "structure",
            title: "Anatomy of a C Program",
            explanation: "Every C program, regardless of its size or complexity, follows the same fundamental structure. This is not arbitrary ceremony — every piece of that structure exists because something in the compilation process or runtime environment requires it. The reason C has <code>main()</code> as its entry point is that the operating system's program loader needs to know exactly where to jump when it starts your program. The reason you <code>#include</code> headers is that the compiler compiles one file at a time and needs to see function declarations before it can check your calls against them. Understanding <em>why</em> each piece exists will make the structure feel inevitable rather than arbitrary.",
            sections: [
                {
                    title: "The Hello World Breakdown",
                    content: "Every programming tutorial starts with 'Hello, World!' — not because it is interesting, but because it is the smallest possible complete C program, and every part of it is necessary. There are no optional decorations. The value of this exercise is not in the output — it is in understanding why each of the six lines exists and what happens if you remove any one of them.",
                    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
                    output: "Hello, World!",
                    warning: "Never read stdio.h as 'studio.h'. It's 'standard input/output', not 'studio'. Read that again. S T D I O. (std for standard, io for input/output). Even humans may understand why you would read that as studio, but compiler will not. Better be careful."
                },
                {
                    title: "Line-by-Line Explanation",
                    points: [
                        "<strong>#include &lt;stdio.h&gt;</strong>: This tells the preprocessor to paste the contents of the <code>stdio.h</code> header file into your source before compilation begins. Why is this necessary? The compiler processes one file at a time and must see a declaration of any function before you call it. <code>printf</code> is defined in the C standard library — a separately compiled binary — but its signature (what arguments it takes, what it returns) lives in <code>stdio.h</code>. Without this line, the compiler sees the name <code>printf</code> and has no idea what it is, how many arguments it expects, or what types those should be.",
                        "<strong>int main()</strong>: This defines the function the operating system calls when it starts your program. Every C program must have exactly one <code>main</code>. When you run a program, the OS loader places it in memory and jumps to the address of <code>main</code>. The <code>int</code> return type is because <code>main</code> returns an exit status code to the shell — 0 means success, anything else signals an error. Without <code>main</code>, the linker cannot produce a runnable executable.",
                        "<strong>{ }</strong>: Curly braces delimit a block — a group of statements that belong together. The block after <code>main()</code> is the function body: everything the program actually does. Every opening brace must have a matching closing brace. One missing brace typically causes a cascade of confusing errors as the compiler loses track of what belongs where.",
                        "<strong>printf(...)</strong>: A function call — you are telling the runtime to execute the function named <code>printf</code>, passing it the string <code>\"Hello, World!\\n\"</code> as an argument. <code>printf</code> is short for 'print formatted' and is the C standard library's primary output function. The semicolon terminates the statement — every statement in C ends with one, just as every sentence in English ends with a period. Forget it and the compiler will report an error on the next line, not this one, which is disorienting.",
                        "<strong>\\n</strong>: Inside a string, the backslash introduces an <em>escape sequence</em> — a way to represent characters that cannot be typed literally. <code>\\n</code> represents a newline character. Without it, after printing 'Hello, World!' the cursor stays on the same line, and the shell's prompt appears immediately after your text.",
                        "<strong>return 0</strong>: Exits <code>main</code> and returns the value 0 to the operating system. This is the exit status — shells use it to check if the program succeeded. By convention, 0 means success and any non-zero value indicates an error. Scripts that call your program can inspect this with <code>$?</code> in Bash."
                    ]
                },
                {
                    title: "Comments",
                    content: "Comments are text in your source code that the compiler completely ignores. They exist purely for humans — to explain what code does, leave notes for yourself, or temporarily disable a line without deleting it. In a language as smooth as C, good comments are the difference between readable code and archaeology.",
                    points: [
                        "<strong>Single-line comment</strong>: Start with <code>//</code>. Everything from those two slashes to the end of the line is ignored by the compiler. This is the comment style you'll use 90% of the time.",
                        "<strong>Multi-line comment</strong>: Start with <code>/*</code> and end with <code>*/</code>. Everything between them is ignored, even if it spans many lines. Useful for temporarily blocking out a large section of code or writing longer explanations.",
                        "<strong>You cannot nest multi-line comments</strong>: Writing <code>/* outer /* inner */ still outer */</code> doesn't work — the first <code>*/</code> closes the whole thing, leaving 'still outer */' as live code. This catches people off guard."
                    ],
                    code: `#include <stdio.h>

int main() {
    // This is a single-line comment. The compiler skips this entire line.
    
    printf("Hello\\n"); // Comments can also go at the end of a line of code.
    
    /*
        This is a multi-line comment.
        It can span as many lines as you want.
        Useful for detailed explanations or temporarily
        disabling a block of code during debugging.
    */
    
    // printf("This line is commented out and won't run.");
    
    return 0;
}`,
                    output: "Hello",
                    tip: "A common debugging trick: instead of deleting code you're not sure about, comment it out with <code>//</code>. You can uncomment it just as easily if you need it back. This is faster and safer than deletion — especially before you have version control set up."
                },
                {
                    title: "The Compilation Process (Simplified)",
                    content: "Here's the thing — computers don't understand C. They never did. They understand machine code: raw binary instructions specific to the processor. C is written for humans to read. The journey from your text file to a running program involves several steps, and knowing these steps will save you enormous confusion when something goes wrong.",
                    points: [
                        "<strong>Source Code</strong>: You write <code>program.c</code> in a text editor. It's just a text file. Nothing special about it yet.",
                        "<strong>Preprocessor</strong>: Before actual compilation starts, the preprocessor scans for lines beginning with <code>#</code>. <code>#include &lt;stdio.h&gt;</code> tells it to literally copy-paste the contents of that header file into your code. By the time the preprocessor is done, your file is much larger than you wrote.",
                        "<strong>Compiler</strong>: This is the translator. It reads your (now preprocessed) C code and converts it into machine code — binary instructions the CPU can actually execute. This is also where syntax errors are caught. Forgot a semicolon? The compiler will tell you here.",
                        "<strong>Linker</strong>: Your code calls functions like <code>printf</code>, but where's the actual machine code for <code>printf</code>? It lives in a pre-compiled library. The linker's job is to stitch your machine code together with the library code to produce a single, complete executable file.",
                        "<strong>Execution</strong>: You run the executable. The OS loads it into memory, finds <code>main</code>, and off you go."
                    ],
                    tip: "Think of the compiler as a very strict translator who refuses to translate your document if you have a single grammatical mistake. A human would understand 'I goed to store' — the compiler would throw it back in your face. This is actually a feature, not a bug. It catches mistakes before they become invisible runtime disasters."
                }
            ]
        },
        {
            id: "printf",
            title: "Printing to the Screen",
            explanation: "Before your program can communicate anything useful, it needs to produce output. In C, virtually all terminal output goes through <code>printf</code> — and <code>printf</code> is considerably more powerful than 'print some text'. The 'f' in <code>printf</code> stands for <em>formatted</em>: it can compose complex output strings by inserting variable values, controlling decimal precision, aligning columns, and representing numbers in different bases — all in a single call. The format string mini-language you learn here will follow you for your entire C career, because the same syntax appears in <code>fprintf</code> (writing to files), <code>sprintf</code> (writing to strings), <code>scanf</code> (reading input), and dozens of other standard library functions.",
            sections: [
                {
                    title: "Basic Printing",
                    content: "The simplest use of <code>printf</code> is passing a string literal — text in double quotes. The text is printed exactly as written. Notice that <code>printf</code> does not add a newline at the end automatically. If you call it twice in a row without <code>\\n</code>, the second output appears on the same line as the first. This is intentional — it lets you build up a line of output across multiple calls — but it surprises everyone the first time they see it.",
                    code: `#include <stdio.h>

int main() {
    // Each printf picks up where the last one left off
    printf("C is ");
    printf("powerful ");
    printf("and fast.\\n");  // Only this one adds a newline

    // With newlines, each message gets its own line
    printf("Line one.\\n");
    printf("Line two.\\n");
    return 0;
}`,
                    output: "C is powerful and fast.\nLine one.\nLine two."
                },
                {
                    title: "Escape Sequences",
                    content: "Some characters can't be typed directly into a string — you can't press the Tab key and have it appear literally inside your code in a meaningful way, and you definitely can't press Enter mid-string. Escape sequences solve this. They start with a backslash <code>\\</code>, which signals 'the next character is special'.",
                    points: [
                        "<code>\\n</code> — Newline: Moves the cursor down to the start of the next line. You will use this constantly. Every line of output should usually end with one.",
                        "<code>\\t</code> — Tab: Inserts a horizontal tab. Great for aligning columns of text without going insane trying to count spaces.",
                        "<code>\\\\</code> — Backslash: Since <code>\\</code> is the escape character, to print an actual backslash you have to escape the escape. Yes, this feels silly. Welcome to C.",
                        "<code>\\\"</code> — Double Quote: Double quotes mark the start and end of a string. If you want a quote character inside the string itself, you have to escape it, otherwise C thinks you're ending the string early."
                    ],
                    code: `#include <stdio.h>

int main() {
    printf("Column 1\\tColumn 2\\n");
    printf("He said, \\"Hello!\\"\\n");
    printf("Path: C:\\\\Programs\\\\n");
    return 0;
}`,
                    output: "Column 1    Column 2\nHe said, \"Hello!\"\nPath: C:\\Programs\\"
                },
                {
                    title: "Format Specifiers (Printing Variables)",
                    content: "This is where <code>printf</code> earns the 'Formatted' part of its name. You rarely want to print only hardcoded text — you want to print the values of variables. Format specifiers are placeholders inside the string that get replaced with actual values at runtime. The format string and the variable list must match up in type and order, or you will get garbage output (at best) or a crash (at worst).",
                    points: [
                        "<code>%d</code> or <code>%i</code> — Integer (whole numbers, positive or negative). This is the one you'll use most.",
                        "<code>%f</code> — Float or Double (decimal numbers). Prints 6 decimal places by default, which is usually too many.",
                        "<code>%c</code> — Character (a single character, like 'A' or '7').",
                        "<code>%s</code> — String (a sequence of characters, i.e., text).",
                        "<code>%x</code> or <code>%X</code> — Integer printed in hexadecimal (lowercase/uppercase). Useful for memory addresses and bit patterns.",
                        "<code>%%</code> — Prints a literal percent sign. Because <code>%</code> is special, you have to escape it too, just like the backslash."
                    ],
                    code: `#include <stdio.h>

int main() {
    int quantity = 5;
    float price = 19.99;
    int flags = 255; // 0xFF in hex
    
    printf("I want to buy %d items.\\n", quantity);
    printf("The price is $%.2f each.\\n", price);
    printf("Flags in hex: 0x%X\\n", flags); // 0xFF
    
    return 0;
}`,
                    output: "I want to buy 5 items.\nThe price is $19.99 each.\nFlags in hex: 0xFF",
                    tip: "The <code>%.2f</code> means 'print this float with exactly 2 decimal places'. If you use plain <code>%f</code>, you'll get something like <code>19.990000</code>, which is technically correct but looks awful. The format is <code>%[width].[precision]f</code> — you can control how many digits appear on each side of the decimal point."
                }
            ]
        },
        {
            id: "variables",
            title: "Variables and Data Types",
            explanation: "A variable is a named location in your computer's RAM where you store a value. Programs compute things — and to compute anything, they need to hold intermediate results somewhere. Without variables, every calculation would have to happen in a single expression with no memory of previous results, which is impossibly restrictive. In C specifically, you must declare what type of data each variable will hold before you use it. This is not bureaucracy — it is the compiler asking 'how many bytes do I need to reserve, and how should I interpret those bytes?' A 32-bit pattern stored in memory could be a positive integer, a negative integer, a float, four ASCII characters, or anything else — the type is what tells the compiler which interpretation to use.",
            sections: [
                {
                    title: "The 'Box' Analogy",
                    content: "RAM is a long sequence of bytes, each at a numbered address. When you declare a variable, the compiler picks an unused address (or assigns one on the stack), reserves the right number of bytes for that type, and associates your chosen name with that address. From that point on, when you read or write the variable, the compiler translates that into a load or store instruction targeting the specific address. Every variable has three distinct stages in its lifecycle:",
                    points: [
                        "<strong>Declaration</strong>: <code>int age;</code> — tells the compiler 'reserve space for an integer and call it <code>age</code>'. At this point, <code>age</code> holds whatever bytes happened to be at that memory address before you arrived — garbage. Reading it at this point is undefined behaviour in C, meaning the compiler is allowed to do anything: return garbage, crash, or produce wrong answers silently.",
                        "<strong>Initialization</strong>: <code>age = 25;</code> — writes a value into the reserved space. Only after initialization is the variable safe to read.",
                        "<strong>Declaration + initialization in one step</strong>: <code>int age = 25;</code> — this is the normal form. Always prefer it. An uninitialized variable is a loaded weapon.",
                        "There is also a difference between a <em>declaration</em> (saying a variable exists) and a <em>definition</em> (actually creating it with storage). For local variables, these are always the same thing. The distinction matters for global variables in multi-file programs, covered in the Intermediate module."
                    ]
                },
                {
                    title: "Primary Data Types",
                    content: "C's built-in types represent the fundamental categories of data the CPU can natively process. Each type specifies exactly two things: how many bytes to reserve, and how to interpret those bytes. The distinction is crucial — the same 4 bytes in memory could mean a 32-bit signed integer (possibly negative), an unsigned 32-bit integer (only non-negative), or a 32-bit IEEE 754 float. The type you choose determines which of those meanings applies.",
                    code: `#include <stdio.h>

int main() {
    // int: whole numbers, positive or negative
    // Typically 4 bytes; range roughly -2.1 billion to +2.1 billion
    int age = 25;
    int temperature_c = -15;    // negative values work fine

    // float: decimal numbers, ~6-7 significant digits of precision
    float price = 19.99f;       // note the 'f' suffix — without it, it's a double
    
    // double: decimal numbers, ~15-16 significant digits
    // Default for decimal literals; prefer double over float in most code
    double pi = 3.14159265358979;
    
    // char: a single character, stored as its ASCII code (1 byte)
    // 'A' is stored as the integer 65 — they are literally the same thing
    char grade = 'A';
    char newline_char = '\\n';   // escape sequences work in char literals too

    printf("Age: %d, Temperature: %d\\n", age, temperature_c);
    printf("Price: %.2f\\n", price);
    printf("Pi to 14 places: %.14f\\n", pi);
    printf("Grade: %c (ASCII %d)\\n", grade, grade); // same value, two formats
    
    return 0;
}`,
                    output: "Age: 25, Temperature: -15\nPrice: 19.99\nPi to 14 places: 3.14159265358979\nGrade: A (ASCII 65)"
                },
                {
                    title: "Type Sizes and Why They Matter",
                    content: "Every type has a fixed size in bytes, and that size determines both the range of values it can hold and how it behaves at the extremes. This is not just trivia — overflow (exceeding the maximum value) does not produce an error in C. For unsigned types it wraps silently to zero; for signed types it is undefined behaviour. Real bugs in real software have been caused by a counter that was supposed to count to 4 billion using a 32-bit signed integer that ran out at 2.1 billion, or a loop index that wrapped from a huge positive number back to zero and corrupted memory. Knowing the limits of each type is part of writing correct C.",
                    points: [
                        "<code>char</code>: 1 byte. Stores either a small integer (-128 to 127 for signed char, 0 to 255 for unsigned char) or an ASCII character code. The character 'A' and the integer 65 are the same byte.",
                        "<code>short</code>: Typically 2 bytes. Range -32,768 to 32,767. Rarely used directly — mostly in data structures where space is tight.",
                        "<code>int</code>: Typically 4 bytes on modern systems. Range approximately -2.1 billion to +2.1 billion. The default integer type for general use.",
                        "<code>long</code>: At least 4 bytes, often 8 bytes on 64-bit Linux/macOS. Use <code>long long</code> if you need to be certain of 8 bytes.",
                        "<code>float</code>: 4 bytes, IEEE 754 single precision. About 6–7 significant decimal digits. Small rounding errors are inherent — never use for money or accumulated computations.",
                        "<code>double</code>: 8 bytes, IEEE 754 double precision. About 15–16 significant decimal digits. The default floating-point type. Use <code>double</code> unless you have a specific reason for <code>float</code>.",
                        "<strong>The overflow trap</strong>: An <code>int</code> holding value 2,147,483,647 (INT_MAX) that you add 1 to does not become 2,147,483,648 — it invokes undefined behaviour and on most platforms wraps to -2,147,483,648 (INT_MIN). This has caused real security vulnerabilities."
                    ],
                    warning: "Using the wrong format specifier (e.g., <code>%d</code> for a float) produces garbage output and is technically undefined behavior. The computer reads the raw bytes of your float and interprets them as an integer — the result is some random-looking number. Always match your format specifiers to your variable types."
                },
                {
                    title: "Numeric Literals: Decimal, Hex, Octal, and Binary",
                    content: "When you write a number directly in your code, it's called a numeric literal. By default C interprets it as decimal (base 10), which is what you'd expect. But C also supports other number bases using special prefixes — and one of them has a trap you absolutely need to know about.",
                    points: [
                        "<strong>Decimal (base 10)</strong>: Normal numbers. <code>int x = 42;</code>. No prefix. This is the default.",
                        "<strong>Hexadecimal (base 16)</strong>: Prefix <code>0x</code> or <code>0X</code>. Digits are 0–9 and A–F. <code>int x = 0xFF;</code> is 255 in decimal. Used constantly for bit masks, memory addresses, and color values. Print with <code>%x</code> or <code>%X</code>.",
                        "<strong>Octal (base 8)</strong>: Prefix <code>0</code> (just a leading zero). <code>int x = 017;</code> is 15 in decimal. This is the trap. If you try to pad a decimal number with leading zeros to make it line up visually — like <code>int x = 0099;</code> — you'll get a compiler error because 9 isn't a valid octal digit. And <code>int x = 0077;</code> compiles fine but gives you 63, not 77.",
                        "<strong>Binary (base 2)</strong>: Prefix <code>0b</code> or <code>0B</code>. <code>int x = 0b1010;</code> is 10 in decimal. This was added in C23 and is supported as an extension by GCC and Clang even for older standards."
                    ],
                    code: `#include <stdio.h>

int main() {
    int dec = 255;    // Decimal
    int hex = 0xFF;   // Hexadecimal: same value
    int oct = 0377;   // Octal: same value
    int bin = 0b11111111; // Binary: same value (C23/GCC extension)
    
    printf("Decimal:     %d\\n", dec); // 255
    printf("Hex:         %d\\n", hex); // 255
    printf("Octal:       %d\\n", oct); // 255
    printf("Binary:      %d\\n", bin); // 255
    
    // Print in different bases
    printf("\\n255 in hex:  0x%X\\n", 255); // 0xFF
    printf("255 in octal: 0%o\\n",  255); // 0377
    
    // THE OCTAL TRAP
    int year  = 2024;  // Fine: decimal 2024
    int wrong = 0144;  // Looks like 144 but it's OCTAL: = 100 decimal!
    printf("\\nOctal trap: 0144 = %d in decimal\\n", wrong); // 100
    
    return 0;
}`,
                    output: "Decimal:     255\nHex:         255\nOctal:       255\nBinary:      255\n\n255 in hex:  0xFF\n255 in octal: 0377\n\nOctal trap: 0144 = 100 in decimal",
                    warning: "The octal trap is real and subtle. Any integer literal with a leading zero is octal, not decimal. <code>int pin = 0123;</code> looks like the number 123 but is actually 83. This has caused bugs in real software — particularly in Unix file permission masks like <code>chmod(path, 0755)</code>, where the leading zero is intentional. Never pad decimal numbers with leading zeros."
                },
                {
                    title: "Naming Rules",
                    content: "Variable names in C follow strict rules. Break them and the compiler won't budge. Follow them but name things poorly and future-you will be confused in two weeks.",
                    points: [
                        "Must start with a letter (A–Z, a–z) or an underscore. Numbers cannot be first.",
                        "After the first character, letters, digits (0–9), and underscores are all fair game.",
                        "Case-sensitive: <code>Score</code>, <code>score</code>, and <code>SCORE</code> are three completely separate variables. This has caused real production bugs.",
                        "Cannot use C's reserved keywords as names. You can't name a variable <code>int</code>, <code>return</code>, <code>if</code>, etc. The compiler will be very upset.",
                        "Best Practice: Use descriptive names. <code>user_age</code> is infinitely better than <code>x</code>. You may think you'll remember what <code>x</code> means tomorrow. You won't."
                    ]
                }
            ]
        },
        {
            id: "booleans",
            title: "Boolean Types",
            explanation: "A boolean is a value that is either true or false. In C's earliest days there was no dedicated boolean type — programmers used plain integers, where 0 meant false and any non-zero value meant true. C99 fixed this by adding <code>_Bool</code> as a built-in type and the <code>&lt;stdbool.h&gt;</code> header which gives you the much more readable names <code>bool</code>, <code>true</code>, and <code>false</code>. Every modern C program should use these.",
            sections: [
                {
                    title: "The Old Way vs The Right Way",
                    content: "Before C99, C programmers wrote boolean logic using plain integers. This works because C's <code>if</code>, <code>while</code>, and other control flow constructs test for zero vs non-zero — they never required a dedicated boolean type. But it means your code is littered with <code>int</code> variables named things like <code>found</code> or <code>done</code>, with no way for the compiler to enforce that you only store 0 or 1 in them.",
                    code: `#include <stdio.h>
#include <stdbool.h>  // Gives us: bool, true, false

int main() {
    // OLD WAY: int used as a boolean
    int is_raining_old = 1;  // 1 for true
    int has_umbrella_old = 0; // 0 for false
    
    // MODERN WAY: actual bool type
    bool is_raining = true;
    bool has_umbrella = false;
    
    if (is_raining && !has_umbrella) {
        printf("You're going to get wet.\\n");
    }
    
    // bool stores 1 for true, 0 for false
    printf("is_raining = %d\\n", is_raining);   // 1
    printf("has_umbrella = %d\\n", has_umbrella); // 0
    
    // Comparison operators return bool values (1 or 0)
    bool is_adult = (18 >= 18);
    printf("is_adult = %d\\n", is_adult); // 1
    
    return 0;
}`,
                    output: "You're going to get wet.\nis_raining = 1\nhas_umbrella = 0\nis_adult = 1"
                },
                {
                    title: "_Bool Without the Header",
                    content: "The actual built-in type is <code>_Bool</code>, which is available without any header. <code>bool</code>, <code>true</code>, and <code>false</code> are macros defined in <code>&lt;stdbool.h&gt;</code> that expand to <code>_Bool</code>, <code>1</code>, and <code>0</code> respectively. In C23, <code>bool</code>, <code>true</code>, and <code>false</code> became actual keywords so you no longer need the header — but for compatibility with older standards, always include it.",
                    points: [
                        "<strong><code>_Bool</code></strong>: The raw C99 boolean type. Can only hold 0 or 1. If you assign any non-zero value to it, it automatically stores 1.",
                        "<strong><code>bool</code></strong>: A macro for <code>_Bool</code> provided by <code>&lt;stdbool.h&gt;</code>. Use this name in your code — it's cleaner and universally understood.",
                        "<strong><code>true</code></strong>: A macro for <code>1</code>.",
                        "<strong><code>false</code></strong>: A macro for <code>0</code>.",
                        "<strong>Printing booleans</strong>: Use <code>%d</code> — there's no <code>%b</code> format specifier for booleans. It prints 1 or 0."
                    ],
                    code: `#include <stdio.h>
#include <stdbool.h>

// Functions can return bool
bool isEven(int n) {
    return n % 2 == 0;
}

bool isPassing(int score) {
    return score >= 60;
}

int main() {
    printf("isEven(4):       %d\\n", isEven(4));       // 1
    printf("isEven(7):       %d\\n", isEven(7));       // 0
    printf("isPassing(75):   %d\\n", isPassing(75));   // 1
    printf("isPassing(55):   %d\\n", isPassing(55));   // 0
    
    // _Bool truncates any non-zero to 1
    _Bool x = 42;   // Stored as 1, not 42
    _Bool y = -99;  // Stored as 1
    _Bool z = 0;    // Stored as 0
    printf("_Bool of 42:  %d\\n", x); // 1
    printf("_Bool of -99: %d\\n", y); // 1
    printf("_Bool of 0:   %d\\n", z); // 0
    
    return 0;
}`,
                    output: "isEven(4):       1\nisEven(7):       0\nisPassing(75):   1\nisPassing(55):   0\n_Bool of 42:  1\n_Bool of -99: 1\n_Bool of 0:   0",
                    tip: "Use <code>bool</code> for any variable that represents a yes/no, on/off, true/false state. It makes your intent immediately obvious and costs nothing — <code>bool</code> is typically 1 byte, same as <code>char</code>. Return <code>bool</code> from functions that answer yes/no questions: <code>bool isValid(...)</code>, <code>bool contains(...)</code>, <code>bool isEmpty(...)</code>."
                }
            ]
        },
        {
            id: "scanf",
            title: "Getting User Input",
            explanation: "A program that only ever prints things it already knows is barely more useful than a text file. To actually interact with a user, you need to read input. <code>scanf</code> — Scan Formatted — is C's way of reading from the keyboard. It's powerful, but it's also notorious for having subtle gotchas that trip people up for years.",
            sections: [
                {
                    title: "Basic Usage",
                    content: "The syntax mirrors <code>printf</code>: you provide a format string with specifiers, followed by the variables to store values into. The big, confusing difference: you need the <code>&</code> operator in front of each variable.",
                    code: `#include <stdio.h>

int main() {
    int number;
    
    printf("Enter a number: ");
    // &number means "the memory address of the variable 'number'"
    scanf("%d", &number);
    
    printf("You entered: %d\\n", number);
    return 0;
}`,
                    output: "Enter a number: [user types 42]\nYou entered: 42"
                },
                {
                    title: "Why the & ?",
                    tip: "This trips up nearly everyone at first. Here's the concept: in C, when you call a function and pass a variable, the function gets a copy of that value. If <code>scanf</code> only had a copy of <code>number</code>, it could fill the copy all it wants — your real variable would never change. By passing <code>&number</code> (the memory address of <code>number</code>), you're essentially handing <code>scanf</code> a map that says 'the variable lives here — go write directly into that location'. This is how C allows functions to actually modify variables that belong to the caller. You'll see this pattern constantly."
                },
                {
                    title: "Reading Different Types",
                    content: "You can read multiple values in a single <code>scanf</code> call by chaining specifiers. The user can separate them with spaces or newlines — <code>scanf</code> will skip whitespace between values automatically. One common annoyance: when reading a <code>char</code> after a previous <code>scanf</code>, there's often a leftover newline character sitting in the input buffer from when the user pressed Enter. A space before <code>%c</code> in the format string tells <code>scanf</code> to skip any whitespace first.",
                    code: `#include <stdio.h>

int main() {
    char initial;
    int age;
    
    printf("Enter your initial and age (e.g. J 25): ");
    // Note the space before %c to skip any leftover newlines
    scanf(" %c %d", &initial, &age);
    
    printf("Initial: %c, Age: %d\\n", initial, age);
    return 0;
}`,
                    output: "Enter your initial and age (e.g. J 25): [user types J 25]\nInitial: J, Age: 25"
                },
                {
                    title: "Common Pitfall: Strings",
                    content: "Reading strings with <code>scanf</code> and <code>%s</code> has a critical limitation: it stops reading at the first space. So if the user types 'John Smith', you only get 'John'. To read a whole line including spaces, use <code>fgets</code> instead. Also notice that for character arrays (strings), you do NOT use <code>&</code> — the array name itself already represents the starting memory address.",
                    warning: "Never use <code>scanf(\"%s\", buffer)</code> without a width limit like <code>scanf(\"%49s\", buffer)</code>. If the user types more characters than your array can hold, <code>scanf</code> will cheerfully write past the end of your array into whatever memory comes next. This is called a buffer overflow — it's one of the most exploited security vulnerabilities in software history, and C gives you zero protection against it by default. You are on your own."
                }
            ]
        },
        {
            id: "operators",
            title: "Operators",
            explanation: "Operators are the action symbols of C — they tell the computer to perform operations on values and variables. You already know most of them from math class, but C has a few that will surprise you, and a couple of familiar ones that behave very differently from what you'd expect.",
            sections: [
                {
                    title: "Arithmetic Operators",
                    content: "Addition, subtraction, multiplication — these all work exactly as you expect. Division and modulus, however, have behaviors that will catch you off guard the first time.",
                    code: `#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    printf("Addition: %d\\n", a + b);       // 13
    printf("Subtraction: %d\\n", a - b);    // 7
    printf("Multiplication: %d\\n", a * b); // 30
    printf("Division: %d\\n", a / b);       // 3 (Integer division truncates decimal)
    printf("Modulus: %d\\n", a % b);        // 1 (Remainder of 10 / 3)
    
    return 0;
}`,
                    output: "Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3\nModulus: 1",
                    tip: "Integer division throws away the decimal part entirely — it doesn't round, it truncates. <code>10 / 3</code> is <code>3</code>, not <code>3.33</code>, not <code>4</code>. Just <code>3</code>. If you want decimal division, at least one operand must be a floating-point number: <code>10.0 / 3</code> gives you <code>3.333...</code>. The modulus operator <code>%</code> gives you the remainder after division: <code>10 % 3</code> is <code>1</code> because 10 = 3×3 + 1. It's incredibly useful for things like checking if a number is even (<code>n % 2 == 0</code>), cycling through values, and many other patterns."
                },
                {
                    title: "Assignment Operators",
                    content: "The shorthand assignment operators let you modify a variable without writing its name twice. They're common in real code and worth knowing by reflex.",
                    points: [
                        "<code>x += 5</code> means <code>x = x + 5</code>. Read it as 'add 5 to x'. This is extremely common in loops.",
                        "<code>x -= 5</code> means <code>x = x - 5</code>. 'Subtract 5 from x'.",
                        "<code>x *= 5</code> means <code>x = x * 5</code>. 'Multiply x by 5'.",
                        "<code>x /= 5</code> means <code>x = x / 5</code>. Same integer-division rules apply here — if x is an int, you still lose the decimal.",
                        "<code>x %= 5</code> means <code>x = x % 5</code>. 'Replace x with the remainder of x divided by 5'."
                    ]
                },
                {
                    title: "Integer Literal Suffixes",
                    content: "When you write a number like <code>42</code> or <code>1000000</code> in your code, the compiler gives it a type automatically — usually <code>int</code>. But sometimes you need the literal to be a specific type: an <code>unsigned int</code>, a <code>long</code>, or a <code>long long</code>. Suffixes let you specify this. They appear at the end of the number and tell the compiler exactly which type to use.",
                    points: [
                        "<code>U</code> or <code>u</code> — Unsigned: <code>42U</code> is an <code>unsigned int</code>. Use this when mixing with unsigned variables to prevent signed/unsigned comparison warnings.",
                        "<code>L</code> or <code>l</code> — Long: <code>42L</code> is a <code>long</code>. Always use uppercase <code>L</code> — lowercase <code>l</code> looks too much like the digit <code>1</code>.",
                        "<code>LL</code> or <code>ll</code> — Long Long: <code>42LL</code> is a <code>long long</code>. Needed when you want a constant that doesn't fit in a regular <code>int</code>.",
                        "<code>UL</code> — Unsigned Long: Combinations work. <code>42UL</code>, <code>42ULL</code>, etc.",
                        "<code>f</code> or <code>F</code> — Float: <code>3.14f</code> is a <code>float</code>. Without the <code>f</code>, <code>3.14</code> is a <code>double</code>. This matters for performance on embedded systems and when calling float-specific math functions."
                    ],
                    code: `#include <stdio.h>

int main() {
    // Without suffix: int (can overflow for large values!)
    // 2147483648 is INT_MAX + 1 -- overflow on 32-bit int
    // long int x = 2147483648;  // WARNING: integer overflow
    
    // With suffix: long long (guaranteed to hold large values)
    long long big = 2147483648LL;
    printf("big = %lld\\n", big); // 2147483648
    
    // Float vs double literal
    float  f1 = 3.14f;  // float literal
    double d1 = 3.14;   // double literal (default)
    printf("float:  %.10f\\n", f1); // ~3.1400001049 (float precision)
    printf("double: %.10f\\n", d1); // 3.1400000000
    
    // Left shift with suffix to avoid overflow
    // 1 << 31 is UB if 1 is int (32-bit) -- bit shifts past the sign bit
    unsigned int mask = 1U << 31; // OK: 1U is unsigned
    printf("mask = 0x%X\\n", mask); // 0x80000000
    
    return 0;
}`,
                    output: "big = 2147483648\nfloat:  3.1400001049\ndouble: 3.1400000000\nmask = 0x80000000",
                    tip: "The most practically important suffix is <code>LL</code> for large integer constants and <code>f</code> for float literals. You'll run into the <code>1U << 31</code> pattern constantly in bitwise code — always use <code>U</code> when shifting into or past the sign bit to avoid undefined behavior."
                },
                {
                    title: "Increment and Decrement",
                    content: "Adding or subtracting 1 from a variable is so common in programming (especially in loops) that C has dedicated operators for it. The difference between the prefix and postfix versions is subtle but matters in certain situations.",
                    code: `#include <stdio.h>

int main() {
    int counter = 0;
    
    counter++; // Adds 1. Counter is now 1.
    ++counter; // Adds 1. Counter is now 2.
    
    printf("Counter: %d\\n", counter);
    
    // Difference comes when used in expressions
    int a = 5;
    int b;
    
    b = a++; // Post-increment: b gets a (5), THEN a increases to 6.
    printf("a: %d, b: %d\\n", a, b);
    
    a = 5; // Reset
    b = ++a; // Pre-increment: a increases to 6, THEN b gets a (6).
    printf("a: %d, b: %d\\n", a, b);
    
    return 0;
}`,
                    output: "Counter: 2\na: 6, b: 5\na: 6, b: 6"
                },
                {
                    title: "Operator Precedence",
                    content: "When multiple operators appear in a single expression, C needs to decide which ones to evaluate first. It follows a precedence hierarchy — some operators bind tighter than others. This is exactly like PEMDAS in math: <code>2 + 3 * 4</code> is 14, not 20, because multiplication has higher precedence than addition. C has many more operators than basic math, so the hierarchy is longer — but the same principle applies.",
                    points: [
                        "<strong>Highest: <code>++</code> <code>--</code> (postfix), <code>()</code>, <code>[]</code></strong> — Function calls, array access, and postfix increment/decrement bind first.",
                        "<strong>High: <code>++</code> <code>--</code> (prefix), <code>!</code>, unary <code>-</code>, <code>*</code> (dereference), <code>&</code>, <code>sizeof</code></strong> — Unary operators applied to a single operand.",
                        "<strong>Medium-high: <code>*</code> <code>/</code> <code>%</code></strong> — Multiplication, division, modulus.",
                        "<strong>Medium: <code>+</code> <code>-</code></strong> — Addition and subtraction.",
                        "<strong>Medium-low: <code>&lt;</code> <code>&lt;=</code> <code>&gt;</code> <code>&gt;=</code></strong> — Comparison operators.",
                        "<strong>Lower: <code>==</code> <code>!=</code></strong> — Equality checks (lower than comparisons — this surprises people).",
                        "<strong>Low: <code>&&</code></strong> — Logical AND.",
                        "<strong>Lower: <code>||</code></strong> — Logical OR.",
                        "<strong>Lowest: <code>=</code> <code>+=</code> <code>-=</code> etc.</strong> — Assignment operators evaluate last, after everything on the right is resolved."
                    ],
                    code: `#include <stdio.h>

int main() {
    // Precedence example 1: * before +
    int a = 2 + 3 * 4;   // Evaluates as 2 + (3 * 4) = 14
    
    // Precedence example 2: comparison before equality
    int b = 5 > 3 == 1;  // Evaluates as (5 > 3) == 1 -> 1 == 1 -> 1 (true)
    
    // Precedence example 3: use parentheses to override
    int c = (2 + 3) * 4; // Parentheses force addition first -> 20
    
    printf("a = %d\\n", a); // 14
    printf("b = %d\\n", b); // 1
    printf("c = %d\\n", c); // 20
    
    return 0;
}`,
                    output: "a = 14\nb = 1\nc = 20",
                    tip: "You don't need to memorize the full precedence table — no one does. What you need to know is: multiplication/division before addition/subtraction, comparisons before equality checks, <code>&&</code> before <code>||</code>. For everything else, just use parentheses. They cost nothing, make intent obvious, and prevent the kind of precedence bug that wastes an hour of debugging. When in doubt, add parentheses."
                }
            ]
        },
        {
            id: "conditionals",
            title: "Conditional Statements",
            explanation: "A program that always does the same thing regardless of its inputs is not useful. Real programs make decisions — show a login screen if the user is not authenticated, display an error if a file cannot be opened, take a different code path depending on the user's choice. Conditional statements are the mechanism for this: they allow execution to branch, taking one path or another based on whether a condition evaluates to true or false. In C, any non-zero integer value is 'true' and zero is 'false' — there is no separate Boolean type required (though <code>&lt;stdbool.h&gt;</code> provides one for readability). This numeric definition of truth is a direct consequence of C's low-level nature and appears constantly in real C code.",
            sections: [
                {
                    title: "The 'if' Statement",
                    content: "The <code>if</code> statement is the foundation of all decision-making in C. The condition inside the parentheses is evaluated as an integer: any non-zero result means 'true' and the body runs; zero means 'false' and it is skipped. This is not just a convention — it directly reflects how the CPU works. A comparison instruction like <code>a > b</code> sets a flag register, and the branch instruction reads that flag. Understanding that booleans are just integers in C explains many things that would otherwise look like bizarre language quirks.",
                    code: `#include <stdio.h>

int main() {
    int temperature = 38;

    // Basic if: runs the block only when condition is true
    if (temperature > 37) {
        printf("Fever detected: %.0d degrees.\\n", temperature);
    }

    // The condition is just an integer expression — zero = false, non-zero = true
    int x = 5;
    if (x)          printf("x is non-zero (true)\\n");   // 5 is non-zero
    if (!x)         printf("x is zero (false)\\n");       // !5 = 0, skipped
    if (x - 5)      printf("x minus 5 is non-zero\\n");  // 0, skipped
    if (!(x - 5))   printf("x is exactly 5\\n");          // !0 = 1, runs

    return 0;
}`,
                    output: "Fever detected: 38 degrees.\nx is non-zero (true)\nx is exactly 5"
                },
                {
                    title: "Comparison Operators",
                    content: "Comparison operators evaluate two values and produce either 1 (true) or 0 (false) as an integer result. This integer result is then used by <code>if</code>, <code>while</code>, and other control structures. The most important thing to memorise here is the difference between <code>=</code> and <code>==</code> — this single character difference is responsible for one of the most common bugs in C.",
                    points: [
                        "<code>==</code> Equal to. Checks if two values are identical. <strong>Double equals</strong> — it is a question.",
                        "<code>!=</code> Not equal to. True when the values differ.",
                        "<code>&gt;</code> Greater than. <code>a &gt; b</code> is true only if a is strictly larger than b.",
                        "<code>&lt;</code> Less than. <code>a &lt; b</code> is true only if a is strictly smaller than b.",
                        "<code>&gt;=</code> Greater than or equal to. True if a is larger or the same.",
                        "<code>&lt;=</code> Less than or equal to. True if a is smaller or the same."
                    ],
                    code: `#include <stdio.h>

int main() {
    int a = 10, b = 20;

    printf("a == b : %d\\n", a == b);  // 0 (false)
    printf("a != b : %d\\n", a != b);  // 1 (true)
    printf("a <  b : %d\\n", a <  b);  // 1 (true)
    printf("a >  b : %d\\n", a >  b);  // 0 (false)
    printf("a <= 10: %d\\n", a <= 10); // 1 (true — equal counts)
    printf("a >= 10: %d\\n", a >= 10); // 1 (true — equal counts)

    // Comparison results are just integers — you can store them
    int is_adult = (a >= 18);
    printf("is_adult: %d\\n", is_adult); // 0 (a=10, not adult)

    return 0;
}`,
                    output: "a == b : 0\na != b : 1\na <  b : 1\na >  b : 0\na <= 10: 1\na >= 10: 1\nis_adult: 0",
                    warning: "<code>=</code> is assignment — it changes a variable. <code>==</code> is comparison — it asks a question. Writing <code>if (x = 5)</code> does not compare x to 5 — it assigns 5 to x, then tests whether 5 is non-zero (always true). Your if-block runs unconditionally and x has been silently changed. The compiler may warn about this with <code>-Wall</code>, but it will compile. Always enable compiler warnings when developing."
                },
                {
                    title: "if-else and else-if chains",
                    content: "The <code>else</code> clause handles the case where the condition is false — only one branch ever runs. Chaining <code>else if</code> lets you test multiple conditions in sequence, stopping at the first one that matches. This is how you express multi-way decisions. The order matters: the conditions are tested top to bottom and only the first matching branch runs — the rest are skipped entirely.",
                    code: `#include <stdio.h>

int main() {
    int score = 74;

    // else-if chain: exactly ONE branch runs
    if (score >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70) {
        printf("Grade: C\\n");  // This runs — 74 >= 70 is true
    } else if (score >= 60) {
        printf("Grade: D\\n");  // Skipped — already matched above
    } else {
        printf("Grade: F\\n");  // Skipped
    }

    // if-else for binary decisions
    int balance = -50;
    if (balance >= 0) {
        printf("Account is in credit: $%d\\n", balance);
    } else {
        printf("Account is overdrawn by $%d\\n", -balance);
    }

    return 0;
}`,
                    output: "Grade: C\nAccount is overdrawn by $50",
                    tip: "A common mistake is writing multiple separate <code>if</code> statements when you mean <code>else if</code>. Separate <code>if</code>s all get tested independently. An <code>else if</code> chain stops at the first match. For grade classification, separate <code>if</code>s would print 'C', 'D', and 'F' all for a score of 74 — because all three conditions would be true."
                },
                {
                    title: "Logical Operators",
                    content: "Real conditions are often combinations of multiple tests. Logical operators let you compose conditions: 'if the user is logged in AND has admin rights', 'if the temperature is too high OR the pressure is too low'. C's logical operators also have a performance optimisation built in called short-circuit evaluation — if the result of the whole expression is determined by the first operand alone, the second operand is never evaluated at all.",
                    points: [
                        "<code>&&</code> (AND): Both sides must be true. If the left side is false, the right side is <strong>not evaluated</strong> — the result is already known to be false. This is important: <code>if (ptr != NULL && ptr->value > 0)</code> is safe because if <code>ptr</code> is NULL the second part is skipped entirely.",
                        "<code>||</code> (OR): At least one side must be true. If the left side is true, the right side is <strong>not evaluated</strong> — already known to be true.",
                        "<code>!</code> (NOT): Flips the truth value. <code>!0</code> is 1, <code>!1</code> is 0, <code>!42</code> is also 0 (any non-zero). Useful for readable conditions: <code>if (!gameOver)</code> is clearer than <code>if (gameOver == 0)</code>."
                    ],
                    code: `#include <stdio.h>

int main() {
    int age = 25;
    int has_license = 1;   // 1 = true
    int is_drunk = 0;      // 0 = false

    // AND: all conditions must hold
    if (age >= 18 && has_license && !is_drunk) {
        printf("You may drive.\\n");
    }

    // Short-circuit: the second condition is ONLY evaluated if first is true
    int x = 0;
    // If x were NULL (pointer context), the second part would be skipped safely
    if (x != 0 && (100 / x) > 2) {
        printf("This is safe because short-circuit prevents division by zero.\\n");
    } else {
        printf("x is zero — short-circuit skipped the division.\\n");
    }

    // OR: any condition being true is enough
    int is_weekend = 0;
    int is_holiday = 1;
    if (is_weekend || is_holiday) {
        printf("Day off!\\n");
    }

    return 0;
}`,
                    output: "You may drive.\nx is zero — short-circuit skipped the division.\nDay off!"
                },
                {
                    title: "The switch Statement",
                    content: "When you need to dispatch to one of many branches based on the exact integer value of a single expression, <code>switch</code> is cleaner and often faster than a long <code>else if</code> chain. The compiler can implement a <code>switch</code> as a jump table — an array of code addresses indexed by the switch value — making it O(1) regardless of how many cases there are. An <code>else if</code> chain is always O(n), testing conditions one by one. For large numbers of cases this difference is measurable.",
                    code: `#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1: printf("Monday\\n");    break;
        case 2: printf("Tuesday\\n");   break;
        case 3: printf("Wednesday\\n"); break;  // This runs
        case 4: printf("Thursday\\n");  break;
        case 5: printf("Friday\\n");    break;
        case 6:
        case 7: printf("Weekend!\\n");  break;  // Cases 6 and 7 share a body
        default: printf("Invalid day\\n");      // No break needed on default
    }

    // Demonstrating intentional fall-through (rare but legitimate)
    int http_status = 404;
    printf("HTTP %d: ", http_status);
    switch (http_status / 100) {  // Switch on the hundreds digit
        case 2: printf("Success\\n");      break;
        case 3: printf("Redirect\\n");     break;
        case 4: printf("Client error\\n"); break;
        case 5: printf("Server error\\n"); break;
        default: printf("Unknown\\n");
    }

    return 0;
}`,
                    output: "Wednesday\nHTTP 404: Client error",
                    warning: "The <code>break</code> at the end of each case is essential. Without it, after executing the matched case, execution <em>falls through</em> into the next case and keeps running — even if that next case's value didn't match. Forgetting a <code>break</code> is one of the most common C bugs. Always include a <code>default</code> case to handle unexpected values explicitly — silent ignorance of out-of-range inputs causes hard-to-find bugs."
                }
            ]
        }
    ],
    
    quiz: [
        {
            question: "Which symbol is used for single-line comments?",
            options: ["##", "//", "/* */", "<!--"],
            answer: 1,
            explanation: "'//' starts a single-line comment. Everything from '//' to line end is ignored by the compiler. '/*' opens a multi-line comment. '#' starts preprocessor directives, not comments."
        },
        {
            question: "What does #include <stdio.h> do?",
            options: ["Defines a variable", "Links the standard I/O library", "Starts the program", "Prints text"],
            answer: 1,
            explanation: "#include tells the preprocessor to copy the contents of that header file into your source. stdio.h contains declarations for printf, scanf, and other I/O functions — without it, the compiler has no idea what printf is."
        },
        {
            question: "Which format specifier is used for an integer?",
            options: ["%f", "%s", "%d", "%c"],
            answer: 2,
            explanation: "%d is the format specifier for a signed decimal integer. %f is for float/double, %c for char, %s for strings."
        },
        {
            question: "What is the output of 7 / 2 in C (integers)?",
            options: ["3.5", "3", "4", "Error"],
            answer: 1,
            explanation: "Both operands are integers, so C performs integer division — the fractional part is truncated, not rounded. 7/2 = 3, not 3.5."
        },
        {
            question: "Why do we use & in scanf?",
            options: ["It looks nice", "To pass the address of the variable", "To declare a pointer", "It is optional"],
            answer: 1,
            explanation: "scanf needs the address of the variable to write into, not its value. & gives the address. Without &, you'd pass the current (garbage) value of the variable as the destination address — undefined behavior."
        },
        {
            question: "What does 'return 0' mean in main?",
            options: ["Program crashed", "Program ended successfully", "Program returned a value to be printed", "Infinite loop"],
            answer: 1,
            explanation: "return 0 from main signals successful program termination to the OS. Non-zero conventionally means an error occurred. This is how shell scripts check if a program succeeded."
        },
        {
            question: "Which operator checks for equality?",
            options: ["=", "==", "!=", "==="],
            answer: 1,
            explanation: "== is the equality comparison operator. = is assignment. This is one of the most common beginner bugs: writing if (x = 5) assigns 5 to x instead of comparing."
        },
        {
            question: "What is the value of 15 % 4?",
            options: ["3", "3.75", "0", "4"],
            answer: 0,
            explanation: "% is the modulo (remainder) operator. 15 / 4 = 3 remainder 3, so 15 % 4 = 3."
        },
        {
            question: "What header file provides the bool, true, and false keywords?",
            options: ["<stdlib.h>", "<stdbool.h>", "<types.h>", "<bool.h>"],
            answer: 1,
            explanation: "stdbool.h provides the bool type, and the true/false macros in C99-C17. In C23, bool/true/false are built-in keywords and no header is needed."
        },
        {
            question: "What is the decimal value of 0x1F in C?",
            options: ["10", "16", "31", "1F"],
            answer: 2,
            explanation: "0x means hexadecimal. 0x1F = 1*16 + 15 = 31 in decimal."
        }
    ],
    
    practice: [
        {
            title: "Personal Greeting",
            difficulty: "easy",
            problem: "Write a program that declares a character for your initial and an integer for your age, then prints them like: 'Initial: X, Age: Y'.",
            hint: "Use %c for char and %d for int.",
            solution: `#include <stdio.h>

int main() {
    char initial = 'J';
    int age = 28;
    
    printf("Initial: %c, Age: %d\\n", initial, age);
    return 0;
}`
        },
        {
            title: "Simple Calculator",
            difficulty: "easy",
            problem: "Ask the user for two integers. Print their sum, difference, and product.",
            solution: `#include <stdio.h>

int main() {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    
    printf("Sum: %d\\n", a + b);
    printf("Diff: %d\\n", a - b);
    printf("Product: %d\\n", a * b);
    
    return 0;
}`
        },
        {
            title: "Even or Odd",
            difficulty: "easy",
            problem: "Ask the user for a number. Tell them if it is Even or Odd. Use a bool variable to store the result. (Hint: use the modulus operator %).",
            hint: "Include <stdbool.h> and declare: bool isEven = (n % 2 == 0);",
            solution: `#include <stdio.h>
#include <stdbool.h>

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    
    bool isEven = (n % 2 == 0);
    
    if (isEven) {
        printf("Even\\n");
    } else {
        printf("Odd\\n");
    }
    return 0;
}`
        },
        {
            title: "Grade System",
            difficulty: "medium",
            problem: "Ask for a score (0-100). Print 'A' if >= 90, 'B' if >= 80, 'C' if >= 70, 'D' if >= 60, else 'F'.",
            solution: `#include <stdio.h>

int main() {
    int score;
    printf("Enter score: ");
    scanf("%d", &score);
    
    if (score >= 90) printf("A\\n");
    else if (score >= 80) printf("B\\n");
    else if (score >= 70) printf("C\\n");
    else if (score >= 60) printf("D\\n");
    else printf("F\\n");
    
    return 0;
}`
        },
        {
            title: "Hex Converter",
            difficulty: "medium",
            problem: "Ask the user for a decimal integer. Print it in hexadecimal and octal using the correct format specifiers.",
            solution: `#include <stdio.h>

int main() {
    int n;
    printf("Enter a decimal integer: ");
    scanf("%d", &n);
    
    printf("Decimal: %d\\n", n);
    printf("Hex:     0x%X\\n", n);
    printf("Octal:   0%o\\n", n);
    
    return 0;
}`
        }
    ],
    
    exam: [
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    printf("A");
    printf("B\\n");
    printf("C");
    return 0;
}`,
            options: ["A\\nBC", "AB\\nC", "ABC\\n", "A B C"],
            answer: 1,
            explanation: "printf does not add a newline automatically. Only \\n in the second call creates a newline, so output is AB on one line, then C on the next with no trailing newline."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int x = 10;
    int y = 3;
    printf("%d %d\\n", x / y, x % y);
    return 0;
}`,
            options: ["3 1", "3.33 1", "3 3", "4 1"],
            answer: 0,
            explanation: "Integer division 10/3 truncates to 3. The remainder 10%3 is 1."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int a = 5;
    int b = a++;
    printf("%d %d\\n", a, b);
    return 0;
}`,
            options: ["5 5", "6 5", "6 6", "5 6"],
            answer: 1,
            explanation: "Post-increment: b captures a's value (5) before a increments. After the line, a=6 and b=5."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int x = 7;
    if (x > 5)
        printf("A\\n");
        printf("B\\n");
    return 0;
}`,
            options: ["A", "B", "A\\nB", "Nothing"],
            answer: 2,
            explanation: "Without braces, only the first printf belongs to the if. The second printf(B) is outside the if and always runs. Both print."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int x = 1;
    switch (x) {
        case 1: printf("one ");
        case 2: printf("two ");
        default: printf("def");
    }
    return 0;
}`,
            options: ["one", "one two", "one two def", "def"],
            answer: 2,
            explanation: "No break statements — switch falls through every case once it matches. Starting at case 1, execution falls through case 2 and default."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    float f = 1 / 2;
    printf("%.1f\\n", f);
    return 0;
}`,
            options: ["0.5", "0.0", "1.0", "Compile error"],
            answer: 1,
            explanation: "1 and 2 are both integer literals, so 1/2 is integer division = 0. That 0 is then stored in f as 0.0. The cast must happen before division: (float)1/2 or 1.0/2."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int i = 0;
    while (i < 3) {
        printf("%d ", i);
        i++;
    }
    printf("%d\\n", i);
    return 0;
}`,
            options: ["0 1 2 2", "0 1 2 3", "1 2 3 3", "0 1 2"],
            answer: 1,
            explanation: "Loop runs for i=0,1,2, printing each. After the loop exits (when i=3), printf prints 3."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    char c = 'A';
    printf("%c %d\\n", c, c);
    return 0;
}`,
            options: ["A A", "A 65", "65 A", "65 65"],
            answer: 1,
            explanation: "%c prints the character 'A'. %d prints its ASCII integer value, which is 65. A char is just a small integer — both formats are valid."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int x = 5;
    int y = 10;
    int z = x > 3 && y < 5;
    printf("%d\\n", z);
    return 0;
}`,
            options: ["1", "0", "5", "10"],
            answer: 1,
            explanation: "x > 3 is true (1). y < 5 is false (0). true && false = 0. z is assigned 0."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int x = 0xFF;
    printf("%d\\n", x);
    return 0;
}`,
            options: ["FF", "255", "256", "0xFF"],
            answer: 1,
            explanation: "0xFF is a hexadecimal literal. F=15, so 0xFF = 15*16 + 15 = 255. %d prints it as a decimal integer."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    printf("%d\\n", 2 + 3 * 4);
    printf("%d\\n", (2 + 3) * 4);
    return 0;
}`,
            options: ["14 then 14", "20 then 20", "14 then 20", "20 then 14"],
            answer: 2,
            explanation: "Operator precedence: * before +. 2 + 3*4 = 2+12 = 14. With parentheses: (2+3)*4 = 5*4 = 20."
        },
        {
            question: "What is the output?",
            code: `#include <stdio.h>
int main() {
    int a = 5, b = 10;
    if (a = b) {
        printf("equal\\n");
    } else {
        printf("not equal\\n");
    }
    return 0;
}`,
            options: ["equal", "not equal", "Compile error", "Nothing"],
            answer: 0,
            explanation: "a = b is ASSIGNMENT, not comparison. It assigns 10 to a, then the if tests whether 10 is truthy — it is (non-zero), so 'equal' prints. This is a classic bug; == was intended."
        }
    ],
};

window.ModuleBeginner = ModuleBeginner;