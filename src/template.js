const getTemplate = (lang) => {
  switch (lang) {
    case "cpp":
      return `// Online IDE & Compiler by anurag_5

#include <iostream>
using namespace std;

int main() {
    // Write C++ code here
    cout << "Hello world!";

    return 0;
}`;
    case "c":
      return `// Online IDE & Compiler by anurag_5

#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello world");

    return 0;
}`;
    case "java":
      return `// Online IDE & Compiler by anurag_5

class Solution {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World!");
    }
}`;
    case "python":
      return `# Online IDE & Compiler by anurag_5

print('Hello World!')`;
    case "go":
      return `// Online IDE & Compiler by anurag_5

package main
import "fmt"

func main() {
    fmt.Println("Hello World!")

}`;
    case "javascript":
      return `// Online IDE & Compiler by anurag_5

console.log("Hello World!");`;
  }
};

export default getTemplate;
