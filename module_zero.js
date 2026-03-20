const ModuleZero = {
    //
    description: "The absolute beginning. What programming actually is, how computers 'think' (they don't), what compilers do, and why C is still haunting us. Start here if you've never coded before, or if you think HTML is a programming language.",
    
    lessons: [
        {
            id: "what-is-programming", //
            title: "What is a Programming Language?", //
            explanation: "A programming language is just a set of instructions you write because computers are too stupid to understand English. They only understand electricity—on or off. A programming language is your overpriced translator.", //
            sections: [
                {
                    title: "The Translation Chain", //
                    content: "You write C. The computer reads binary. To bridge this gap, we use compilers. Think of it like writing a novel in English and hiring a highly pedantic translator to convert it into binary zeros and ones.", //
                    points: [
                        "<strong>High-level languages</strong>: Python, Java, JavaScript. These hold your hand and try to make you feel smart.", //
                        "<strong>Low-level languages</strong>: Assembly and machine code. Writing this manually is pure mental torture.", //
                        "<strong>The translation layer</strong>: Compilers and interpreters. The gatekeepers that convert your human-readable text into machine execution." //
                    ]
                },
                {
                    title: "Why Have Programming Languages At All?", //
                    content: "Because writing 1s and 0s manually will destroy your sanity. Early programmers did it. They are either legends or institutionalized.", //
                    points: [
                        "<strong>Abstraction</strong>: Letting you write `sum = a + b` instead of manually shifting voltage across CPU registers.", //
                        "<strong>Readability</strong>: So the developer who takes over your codebase in six months doesn't hunt you down.", //
                        "<strong>Portability</strong>: So your code runs on more than one specific microwave." //
                    ]
                },
                {
                    title: "Where Does C Fit?", //
                    content: "C is a 'mid-level' language. It sits perfectly between the raw chaos of assembly and the bloated luxury of modern languages. It gives you enough rope to hang yourself, and expects you to tie the knot.", //
                    points: [
                        "It is wildly portable. Code written in 1985 still compiles today.", //
                        "It is blazingly fast because it doesn't waste time checking if your actions are safe.", //
                        "It is tiny. No bloat, no massive standard library.", //
                        "It is unforgiving. C assumes you know exactly what you are doing, which is usually a mistake." //
                    ]
                }
            ]
        },
        {
            id: "binary-and-base2", //
            title: "Why Do Computers Use Base 2?", //
            explanation: "Computers aren't magical thinking machines. They are just billions of microscopic switches. On or off. 1 or 0. They don't use base 10 because building a 10-state electronic switch that doesn't immediately break is an engineering nightmare.", //
            sections: [
                {
                    title: "Base 10 vs Base 2: The Counting System", //
                    content: "You use base 10 because you have 10 fingers. Computers use base 2 because they only have two physical states.", //
                    points: [
                        "<strong>Base 10 (decimal):</strong> Digits 0-9. You've used it since kindergarten.", //
                        "<strong>Base 2 (binary):</strong> Digits 0-1. The number 247 in decimal is 11110111 in binary. Same number, just takes more space to write down." //
                    ]
                },
                {
                    title: "Why Base 2? It's All About Hardware", //
                    content: "A transistor is a tiny electronic switch. To represent the number 5, you don't turn on 5 transistors. You use a combination of them read in binary: 0101.", //
                    points: [
                        "<strong>Physical mapping:</strong> OFF = 0. ON = 1. No ambiguity.", //
                        "<strong>Error resistance:</strong> Measuring 10 different voltage levels in a wire buzzing with interference will corrupt your data. Two states give massive, safe margins.", //
                        "<strong>Speed:</strong> Checking 'is there power?' is infinitely faster than checking 'exactly how much power is there?'." //
                    ]
                },
                {
                    title: "Bits, Bytes, and Practical Binary", //
                    content: "A <strong>bit</strong> is a 0 or 1. A <strong>byte</strong> is 8 of them. You will rarely use pure binary because reading it causes eye strain. Instead, you'll use hexadecimal, which is just binary wearing a trench coat.", //
                    points: [
                        "<strong>1 bit:</strong> 2 values (0 or 1).", //
                        "<strong>1 byte:</strong> 8 bits. 256 possible values (0-255).", //
                        "<strong>1 kilobyte:</strong> 1,024 bytes. Not 1,000. Blame base-2 math.", //
                        "<strong>Hexadecimal shorthand:</strong> 11110111 in binary is F7 in hex. It's strictly used because humans are lazy and typing 8 digits is tedious." //
                    ],
                    code: `// In C, you can write binary, decimal, and hexadecimal literals:\nint decimal = 247;      // Base-10\nint hex = 0xF7;         // Hexadecimal (base 16)\nint binary = 0b11110111; // Binary (base 2)\n\nprintf("They are all exactly the same: %d, %d, %d\\n", decimal, hex, binary);\n// Output: They are all exactly the same: 247, 247, 247` //
                }
            ]
        },
        {
            id: "compilers-interpreters", //
            title: "Compilers vs Interpreters", //
            explanation: "Your C code is a text file. The processor looks at it and feels nothing. To make it executable, you need a compiler or interpreter to do the heavy translation work.", //
            sections: [
                {
                    title: "What Does a Compiler Do?", //
                    content: "It reads all your code at once, aggressively judges you for your syntax mistakes, and if you survive, spits out an executable binary file.", //
                    points: [
                        "<strong>Compile time:</strong> Slow. It analyzes, optimizes, and translates everything upfront.", //
                        "<strong>Runtime:</strong> Blazingly fast. It's already machine code.", //
                        "<strong>Error detection:</strong> Caught early. It yells at you before the program ever runs.", //
                        "<strong>Distribution:</strong> You send the user the compiled binary. They don't need your source code." //
                    ]
                },
                {
                    title: "What Does an Interpreter Do?", //
                    content: "It translates your code line-by-line while the program runs. It's like having a live translator who only realizes the speaker makes no sense halfway through the sentence.", //
                    points: [
                        "<strong>Runtime:</strong> Slow. It's translating on the fly.", //
                        "<strong>Error detection:</strong> Appalling. Your program might run perfectly for three hours and then crash because of a typo in an obscure `else` block.", //
                        "<strong>Development cycle:</strong> Fast. Write code, run it immediately.", //
                        "<strong>Distribution:</strong> You send the source code. The user needs the interpreter installed to run it." //
                    ]
                },
                {
                    title: "The Battle of Trade-offs", //
                    content: "There is no perfect choice, only different flavors of suffering.", //
                    points: [
                        "<strong>Compiled (C, Rust):</strong> High performance, low footprint. Used when speed actually matters.", //
                        "<strong>Interpreted (Python, JS):</strong> Fast to write, slow to execute. Used when developer time is more expensive than server time.", //
                        "<strong>Just-In-Time (JIT):</strong> A hybrid approach that tries to give you the best of both worlds and usually just uses massive amounts of RAM instead." //
                    ]
                },
                {
                    title: "The C Compilation Process", //
                    content: "It's an assembly line of translation.", //
                    points: [
                        "<strong>Preprocessing:</strong> Resolves your `#include` macros by aggressively copy-pasting text into your file.", //
                        "<strong>Compilation:</strong> Converts the bloated text file into assembly.", //
                        "<strong>Assembly:</strong> Converts the assembly into raw machine code.", //
                        "<strong>Linking:</strong> Glues your code together with external libraries so it actually functions.", //
                        "<strong>Result:</strong> An executable you can run." //
                    ],
                    code: `// Terminal command to compile:\ngcc myprogram.c -o myprogram\n\n// Then you run it:\n./myprogram` //
                }
            ]
        },
        {
            id: "history-of-c", //
            title: "A Brief History of C", //
            explanation: "C didn't fall from the sky. It was forged in the 1970s because programmers were tired of writing assembly but still needed their operating systems to run efficiently.", //
            sections: [
                {
                    title: "Before C", //
                    content: "People wrote Assembly or FORTRAN. Assembly is tedious and hardware-specific. FORTRAN was highly constrained. Programmers desperately needed a middle ground.", //
                    points: [
                        "Writing an OS in assembly meant if you bought a new computer, you had to rewrite the entire OS from scratch.", //
                        "Development was painfully slow." //
                    ]
                },
                {
                    title: "C is Born (1972-1973)", //
                    content: "Dennis Ritchie at Bell Labs created C as an evolution of a language called B. It was elegant, powerful, and didn't treat the programmer like an idiot.", //
                    points: [
                        "The goal: A high-level language that didn't sacrifice low-level speed.", //
                        "It introduced structs, proper functions, and direct memory access via pointers." //
                    ]
                },
                {
                    title: "The Unix Revolution", //
                    content: "C's killer app was Unix. By rewriting the Unix kernel in C, it became the first portable operating system. Unix spread, and C hitched a ride.", //
                    points: [
                        "<strong>1978:</strong> 'The C Programming Language' (K&R) is published.", //
                        "<strong>1989:</strong> ANSI C standardizes the language so compilers stop arguing over syntax." //
                    ]
                },
                {
                    title: "Why Learn It Today?", //
                    content: "Because it prevents you from being a fraud. C forces you to confront how memory and hardware actually work. Modern languages hide these details until something breaks, at which point you have no idea how to fix it.", //
                    points: [
                        "<strong>The Foundation:</strong> iOS, Windows, Linux, Android—all built on C.", //
                        "<strong>The Speed:</strong> Databases, game engines, and embedded systems rely on it.", //
                        "<strong>The Reality Check:</strong> When YOU manage memory instead of relying on a garbage collector, you become a vastly superior programmer in every other language." //
                    ]
                }
            ]
        }
    ]
};

// BUG FIX: Actually assigning it to the window object so it renders. 
window.ModuleZero = ModuleZero;