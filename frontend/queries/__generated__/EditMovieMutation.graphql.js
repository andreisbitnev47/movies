/**
 * @flow
 * @relayHash 85026adec049544306e1d15e3b11e054
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditMovieMutationVariables = {|
  input: {
    globalId: string,
    title?: ?string,
    description?: ?string,
    clientMutationId?: ?string,
  },
|};
export type EditMovieMutationResponse = {|
  +editMovie: ?{|
    +movie: ?{|
      +title: ?string,
      +description: ?string,
    |},
  |},
|};
*/


/*
mutation EditMovieMutation(
  $input: EditMovieInput!
) {
  editMovie(input: $input) {
    movie {
      title
      description
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "EditMovieInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "EditMovieInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "EditMovieMutation",
  "id": null,
  "text": "mutation EditMovieMutation(\n  $input: EditMovieInput!\n) {\n  editMovie(input: $input) {\n    movie {\n      title\n      description\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditMovieMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editMovie",
        "storageKey": null,
        "args": v1,
        "concreteType": "EditMoviePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "movie",
            "storageKey": null,
            "args": null,
            "concreteType": "Movie",
            "plural": false,
            "selections": [
              v2,
              v3
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditMovieMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "editMovie",
        "storageKey": null,
        "args": v1,
        "concreteType": "EditMoviePayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "movie",
            "storageKey": null,
            "args": null,
            "concreteType": "Movie",
            "plural": false,
            "selections": [
              v2,
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node/*: any*/).hash = '9cfcc8d1cf99d276f15860782bceae7d';
module.exports = node;
