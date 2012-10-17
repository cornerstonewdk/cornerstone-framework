#include <stdio.h>
main(int argc, char** argv)
{
    // warming
    printf("hi \n");
    printf("Arg Count = %d \n", argc);
    int i;
    for (i=0; i<argc; i++) {

        printf("Arg #%d = '%s' \n",i, argv[i]);
        
    }

    // opne file
}
