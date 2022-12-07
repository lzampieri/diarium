<?php

namespace App\Custom;

use App\Models\Section;
use App\Models\Think;
use App\Models\Workspace;
use Closure;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;
use Illuminate\Support\Facades\DB;

class WorkspaceToAllThinks extends HasOneOrMany
{

    /**
     * Create a new custom relationship instance.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  \Illuminate\Database\Eloquent\Model  $parent
     * @param  string  $foreignKey
     * @param  string  $localKey
     * @return void
     */
    public function __construct()
    {
        parent::__construct( (new Think())->newQuery(), new Workspace(), 'parent_id', 'id');
    }

    /**
     * Get the results of the relationship.
     *
     * @return mixed
     */
    public function getResults()
    {
        return !is_null($this->getParentKey())
            ? $this->query->get()
            : $this->related->newCollection();
    }

    /**
     * Initialize the relation on a set of models.
     *
     * @param  array  $models
     * @param  string  $relation
     * @return array
     */
    public function initRelation(array $models, $relation)
    {
        foreach ($models as $model) {
            $model->setRelation($relation, $this->related->newCollection());
        }

        return $models;
    }

    /**
     * Set the base constraints on the relation query.
     *
     * @return void
     */
    public function addConstraints()
    {
        // Let's put everything in eager section
    }

    /**
     * Set the constraints for an eager load of the relation.
     *
     * @param  array  $models
     * @return void
     */
    public function addEagerConstraints(array $models)
    {
        $child = new Think();
        $keysList = $this->getKeys($models, $this->localKey);
        $childName = $child->getTable() . '.';

        $query1 = $child->newQuery()
            ->where( $childName . 'thinkable_type', Workspace::class )
            ->whereIn( $childName . 'thinkable_id', $keysList )
            ->select( $childName . '*', $childName . 'thinkable_id as parent_id' );

        
        $secName = ( new Section() )->getTable() . '.';
        $query2 = $child->newQuery()
            ->where( $childName . 'thinkable_type', Section::class )
            ->join( 'sections', $childName . 'thinkable_id', '=', $secName . 'id' )
            ->whereIn( $secName . 'workspace_id', $keysList )
            ->select( $childName . '*', $secName . 'workspace_id as parent_id' );

        $this->query = $query1->union( $query2 );
    }

    /**
     * Match the eagerly loaded results to their parents.
     *
     * @param  array  $models
     * @param  \Illuminate\Database\Eloquent\Collection  $results
     * @param  string  $relation
     * @return array
     */
    public function match(array $models, Collection $results, $relation)
    {
        return $this->matchMany($models, $results, $relation);
    }
}
