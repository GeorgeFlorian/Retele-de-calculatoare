#pragma once
#include <vector>

class ParitateBidimensionala
{
private:
    std::vector<std::vector<int>> matrice;
    int dim;
    bool multipluDe7(int numar);

public:
    ParitateBidimensionala();
};

extern ParitateBidimensionala bp;