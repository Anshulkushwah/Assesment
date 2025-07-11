#include <iostream>
using namespace std;

int main() {
    int a;
    cout << "Enter a number: ";
    cin >> a;

    //  even : reduce it by 1 to get the last odd
    if (a % 2 == 0) {
        a -= 1;
    }

    cout << "Output: ";
    for (int i = 0; i < a; ++i) {
        cout << (2 * i + 1);
        if (i != a - 1) cout << ", ";
    }

    cout << endl;
    return 0;
}
